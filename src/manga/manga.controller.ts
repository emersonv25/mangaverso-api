import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, Version } from "@nestjs/common";
import { MangaService } from "./manga.service";
import { Request, Response } from "express";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { MangaDto, MangaResponseDto, MangaResponsePaginatedDto } from "./dto/manga.dto";

@ApiTags('Manga')
@Controller('api/v1/manga')
export class MangaController{

     constructor(private readonly mangaService: MangaService){}

     @Get()
     @ApiOperation({ summary: `Endpoint to get all mangas.`, })
     @ApiResponse({ status: 200, type: MangaResponsePaginatedDto, description: 'Success.' })
     async getAllManga(@Req() request:Request):Promise<MangaResponsePaginatedDto>{
          return await  this.mangaService.getAllManga()
     }

     @Post()
     @ApiOperation({ summary: `Endpoint to post one manga.`, })
     @ApiResponse({ status: 200, type: MangaResponseDto, description: 'Success.' })
     async postManga(@Body() postData: MangaDto):Promise<any>{
          return this.mangaService.createManga(postData)
     }

     @Get(':id')
     @ApiOperation({ summary: `Endpoint to get one manga.`, })
     @ApiResponse({ status: 200, type: MangaResponseDto, description: 'Success.' })
     async getManga(@Param('id') id:number):Promise<any>{
          return this.mangaService.getManga(id)
     }

     @Delete(':id')
     @ApiOperation({ summary: `Endpoint to delete one mangas.`, })
     @ApiResponse({ status: 200, type: Boolean, description: 'Success.' })
     async deleteManga(@Param('id') id:number):Promise<any>{
          return this.mangaService.deleteManga(id)
     }
     /*
     @Put(':id')
     @ApiOperation({ summary: `Endpoint to update one mangas.`, })
     @ApiResponse({ status: 200, type: Manga, description: 'Success.' })
     async updateManga(@Param('id') id: number,@Body() data: Manga): Promise<Manga> {
       return this.mangaService.updateManga(id, data);
     }*/
}