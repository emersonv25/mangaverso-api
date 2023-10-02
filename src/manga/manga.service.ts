import { Injectable } from "@nestjs/common";
import { Manga } from "@prisma/client";
import { PrismaService } from "src/prisma.service.";
import { MangaDto, MangaResponsePaginatedDto } from "./dto/manga.dto";
import { ChapterService } from "src/chapter/chapter.service";

@Injectable()
export class MangaService {

    constructor(
        private prisma: PrismaService,
        private readonly chapterService: ChapterService
        ) { }

    async getAllManga(): Promise<MangaResponsePaginatedDto> {
        const result = await this.prisma.manga.findMany({include: { genres : true}})

        const response: MangaResponsePaginatedDto = {
            data: result,
            totalPages: 1,
            totalCount: 1,
            currentPage: 1
        }
        return response

    }

    async getManga(id: number): Promise<Manga> {
        return this.prisma.manga.findUnique({ where: { id: Number(id) }, include: { chapters: true, genres : true} })
    }

    async createManga(mangaDto: MangaDto): Promise<Manga> {

       const genresName = mangaDto.genres.map(i => i.toUpperCase());

        const existingGenres = await this.prisma.genre.findMany({
            where: {
                name: { in : genresName}
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