import { Prisma } from "@prisma/client";


export class Manga implements Prisma.MangaCreateInput {
    id: number;
    title: string;
    description: string;
    posterUrl: string;
}