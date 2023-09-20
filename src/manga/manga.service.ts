import { Injectable } from "@nestjs/common";
import { Manga } from "@prisma/client";
import { PrismaService } from "src/prisma.service.";
import { MangaDto, MangaResponseDto, MangaResponsePaginatedDto } from "./dto/manga.dto";


@Injectable()
export class MangaService {

    constructor(private prisma: PrismaService) { }

    async getAllManga(): Promise<MangaResponsePaginatedDto> {
        const result =  await this.prisma.manga.findMany()

        const response : MangaResponsePaginatedDto = {
            data : result,
            totalPages : 1,
            totalCount: 1,
            currentPage: 1
        }
        return response

    }

    async getManga(id: number): Promise<MangaResponseDto | null> {
        return this.prisma.manga.findUnique({ where: { id: Number(id) } })
    }

    async createManga(data: MangaDto): Promise<MangaResponseDto> {
        return this.prisma.manga.create({
            data,
        })
    }

    async updateManga(id: number, data: Manga): Promise<Manga> {
        return this.prisma.manga.update({
            where: { id: Number(id) },
            data:
            {
                title: data.title,
                description: data.description,
                posterUrl: data.posterUrl
            }
        })
    }

    async deleteManga(id: number): Promise<Manga> {
        return this.prisma.manga.delete({
            where: { id: Number(id) }
        })
    }
}