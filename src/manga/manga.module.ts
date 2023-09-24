import { Module } from "@nestjs/common";
import { ChapterModule } from "src/chapter/chapter.module";
import { MangaController } from "./manga.controller";
import { MangaService } from "./manga.service";
import { PrismaService } from "src/prisma.service.";

@Module({
    imports: [ChapterModule], // Certifique-se de que ChapterModule está importado aqui.
    controllers: [MangaController],
    providers: [MangaService, PrismaService],
    exports: [MangaService]
})
export class MangaModule {}