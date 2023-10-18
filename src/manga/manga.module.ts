import { Module } from "@nestjs/common";
import { MangaController } from "./manga.controller";
import { MangaService } from "./manga.service";
import { PrismaService } from "../prisma.service.";
import { ChapterModule } from "../chapter/chapter.module";

@Module({
    imports: [ChapterModule], // Certifique-se de que ChapterModule está importado aqui.
    controllers: [MangaController],
    providers: [MangaService, PrismaService],
    exports: [MangaService]
})
export class MangaModule {}