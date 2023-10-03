import { BadRequestException, Injectable } from '@nestjs/common';
import { ChapterDto, ChapterPageResponseDto, ChapterResponseDto } from 'src/chapter/dto/chapter.dto';
import { PrismaService } from 'src/prisma.service.';

@Injectable()
export class ChapterService {
    constructor(private prisma: PrismaService) { }


    async getChapterPages(chapterId : number) : Promise<ChapterPageResponseDto[]>
    {
        const result : ChapterPageResponseDto[] = await this.prisma.chapterPage.findMany({
            where: { chapterId : Number(chapterId) }
        })

        return result;
    }

    async createChapter(mangaId: number, chapterDto : ChapterDto) :  Promise<ChapterResponseDto> {

        const manga = await this.prisma.manga.findUnique({where:{id: Number(mangaId)}})

        if (!manga) {
            throw new BadRequestException(`Manga with ID ${mangaId} not found.`);
        }
        
        const chapterNumber = await this.prisma.chapter.findMany({where: {chapterNumber: chapterDto.chapterNumber}})
        if(chapterNumber.length > 0)
        {
            throw new BadRequestException(`Chapter with Number ${chapterDto.chapterNumber} already exist.`)
        }

        const createdChapter : ChapterResponseDto = await this.prisma.chapter.create({
            data: {
                mangaId: manga.id,
                chapterNumber: chapterDto.chapterNumber,
                chapterPages: {
                    create : chapterDto.chapterPages
                }
            }, include : { chapterPages: true},
        });

        return createdChapter;
    }

    async createManyChapters(mangaId: number, chapterList: ChapterDto[]) {
        const manga = await this.prisma.manga.findUnique({ where: { id: mangaId } });
    
        if (!manga) {
            throw new BadRequestException(`Manga with ID ${mangaId} not found.`);
        }
    
        const existingChapterNumbers = await this.prisma.chapter.findMany({
            where: {
                mangaId,
                chapterNumber: { in: chapterList.map(dto => dto.chapterNumber) },
            },
        });
    
        const existingChapterNumbersSet = new Set(existingChapterNumbers.map(chapter => chapter.chapterNumber));
    
        const chaptersToCreate: ChapterDto[] = chapterList.filter(dto => !existingChapterNumbersSet.has(dto.chapterNumber));
    
        if (chaptersToCreate.length === 0) {
            throw new BadRequestException('All chapters already exist.');
        }
    
        const createdChapters = [];
    
        for (const chapterDto of chaptersToCreate) {
            const createdChapter = await this.prisma.chapter.create({
                data: {
                    mangaId: manga.id,
                    chapterNumber: chapterDto.chapterNumber,
                },
            });
    
            for (const page of chapterDto.chapterPages) {
                await this.prisma.chapterPage.create({
                    data: {
                        chapterId: createdChapter.id,
                        imageUrl: page.imageUrl,
                        pageNumber: page.pageNumber,
                    },
                });
            }
    
            createdChapters.push(createdChapter);
        }
    
        return createdChapters;
    }
}
