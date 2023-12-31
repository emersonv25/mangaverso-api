import { Injectable } from "@nestjs/common";
import { Manga } from "@prisma/client";
import { MangaDto, MangaResponseDto } from "./dto/manga.dto";
import { ChapterService } from "../chapter/chapter.service";
import { PrismaService } from "../prisma.service.";
import { PaginationDto } from "../dto/pagination.dto";

@Injectable()
export class MangaService {

    constructor(
        private prisma: PrismaService,
        private readonly chapterService: ChapterService
    ) { }

    async getAllManga(pageNumber: number, pageSize: number, search?: string): Promise<PaginationDto<MangaResponseDto[]>> {
        const result : MangaResponseDto[] = await this.prisma.manga.findMany({
            include: {
                genres: true
            },
            skip: (pageNumber - 1) * pageSize,
            take: pageSize,
            where: {
                OR: [
                    { title: { contains: search } },
                    { description: { contains: search } },
                    { genres: { some: { name: { contains: search } } } }
                ]
            }
        });

        const totalCount = await this.prisma.manga.count();
        const totalPages = Math.ceil(totalCount / pageSize);

        const response: PaginationDto<MangaResponseDto[]> = {
            data: result,
            totalPages: totalPages,
            totalCount: totalCount,
            currentPage: pageNumber
        };
        return response;
    }


    async getManga(id: number): Promise<MangaResponseDto> {
        const manga: MangaResponseDto = await this.prisma.manga.findUnique({
            where: { id: Number(id) },
            include: { chapters: true, genres: true },
        });

        if (!manga) {
            throw new Error(`Manga with ID ${id} not found`);
        }

        return manga;
    }

    async createManga(mangaDto: MangaDto): Promise<Manga> {

        const genresName = mangaDto.genres.map(i => i.toUpperCase());

        const existingGenres = await this.prisma.genre.findMany({
            where: {
                name: { in: genresName }
            },
        });

        const newGenres = genresName.filter(name => !existingGenres.some(genre => genre.name === name));

        const createdGenres = [];

        for (const name of newGenres) {
            const createdGenre = await this.prisma.genre.create({
                data: {
                    name: name,
                },
            });
            createdGenres.push(createdGenre);
        }

        const allGenres = [...existingGenres, ...createdGenres];

        const manga = await this.prisma.manga.create({
            data: {
                title: mangaDto.title,
                description: mangaDto.description,
                posterUrl: mangaDto.posterUrl,
                releaseDate: mangaDto.releaseDate,
                genres: {
                    connect: allGenres.map(genre => ({ id: genre.id })),
                },
                type: mangaDto.type,
            },
        });

        this.chapterService.createManyChapters(manga.id, mangaDto.chapters)

        return manga;
    }

    async updateManga(id: number, mangaDto: Manga): Promise<Manga> {
        return this.prisma.manga.update({
            where: { id: Number(id) },
            data:
            {
                title: mangaDto.title,
                description: mangaDto.description,
                posterUrl: mangaDto.posterUrl
            }
        })
    }

    async deleteManga(id: number): Promise<Manga> {
        return this.prisma.manga.delete({
            where: { id: Number(id) }
        })
    }
}