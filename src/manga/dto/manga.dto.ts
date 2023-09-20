import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { PaginationDto } from "src/dto/pagination.dto";

export class MangaDto {
  @ApiProperty({
    description: 'Name of Manga',
    example: 'Um Manga Incrivel',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Description/Sinopse of Manga',
    example: 'Uma descrição bem foda que resume o manga',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Image Url for Manga Poster',
    example: 'https://cdn.discordapp.com/attachments/347182996782055435/1153843819796762714/capa.jpg',
  })
  @IsString()
  @IsNotEmpty()
  posterUrl: string;

}

export class MangaResponseDto extends MangaDto {
  @ApiProperty({
    description: 'Id key of Manga',
    example: 123,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number
}

export class MangaResponsePaginatedDto extends PaginationDto {
  @ApiProperty({
    description: 'Array of Manga Data',
    example: [
      {
        "id": 1,
        "title": "Um Manga Incrivel",
        "description": "Uma descrição bem foda que resume o manga",
        "posterUrl": "https://cdn.discordapp.com/attachments/347182996782055435/1153843819796762714/capa.jpg"
      }
    ],
  })
  data : MangaResponseDto[]
}