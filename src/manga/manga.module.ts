import { Module } from "@nestjs/common";
import { MangaController } from "./manga.controller";
import { MangaService } from "./manga.service";
import { PrismaService } from "src/prisma.service.";



@Module({
    imports: [],
    controllers: [MangaController],
    providers: [MangaService, PrismaService]
  })
  export class MangaModule {}
  