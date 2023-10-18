import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res, Version } from "@nestjs/common";
import { MangaService } from "./manga.service";
import { Request, Response } from "express";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { MangaDto, MangaResponseDto } from "./dto/manga.dto";
import { PaginationDto } from "../dto/pagination.dto";

@ApiTags('Manga')
@Controller('api/v1/manga')
export class MangaController {

     constructor(private readonly mangaService: MangaService) { }

     @Get()
     @ApiOperation({ summary: 'Endpoint to get all mangas with pagination.' })
     @ApiQuery({ name: 'pageNumber', required: false, type: Number })
     @ApiQuery({ name: 'pageSize', required: false, type: Number })
     @ApiQuery({ name: 'search', required: false, type: String })
     @ApiResponse({ status: 200, type: PaginationDto<MangaResponseDto[]>, description: 'Success.' })
     async getAllManga(@Req() request: Request, @Query('pageNumber') pageNumber?: number, @Query('pageSize') pageSize?: number, @Query('search') search?: string): Promise<PaginationDto<MangaResponseDto[]>> {
          pageNumber = pageNumber || 1;
          pageSize = pageSize || 10;
          return await this.mangaService.getAllManga(pageNumber, pageSize, search);
     }

     @Post()
     @ApiOperation({ summary: `Endpoint to post one manga.`, })
     @ApiResponse({ status: 200, type: MangaResponseDto, description: 'Success.' })
     async postManga(@Body() postData: MangaDto): Promise<any> {
          return this.mangaService.createManga(postData)
     }

     @Get(':id')
     @ApiOperation({ summary: `Endpoint to get one manga.`, })
     @ApiResponse({ status: 200, type: MangaResponseDto, description: 'Success.' })
     async getManga(@Param('id') id: number): Promise<any> {
          return this.mangaService.getManga(id)
     }

     @Delete(':id')
     @ApiOperation({ summary: `Endpoint to delete one mangas.`, })
     @ApiResponse({ status: 200, type: Boolean, description: 'Success.' })
     async deleteManga(@Param('id') id: number): Promise<any> {
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