import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { PaginationDto } from "src/dto/pagination.dto";
import { ChapterDto, ChapterResponseDto } from "../../chapter/dto/chapter.dto";

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

  @ApiProperty({
    description: 'Released Date of the Manga',
    example: '2023',
  })
  @IsString()
  @IsNotEmpty()
  releaseDate: string;

  @ApiProperty({
    description: 'list containing manga genres',
    example: ['Shounen', 'Seinen']
  })
  genres: string[]

  @ApiProperty({
    description: 'MANGA, MANHWA, MANHUA, NOVEL or COMIC',
    example: 'MANGA',
  })
  @IsString()
  @IsOptional()
  type: string

  @ApiProperty({
    description: 'List of Chapters',
    type: () => [ChapterDto]
  })
  chapters: ChapterDto[]

}

export class MangaResponseDto {
  @ApiProperty({
    description: 'Id key of Manga',
    example: 123,
  })
  id: number

  @ApiProperty({
    description: 'Created',
    example: '2023-10-02T13:02:02.735Z'
  })
  createdAt: Date

  @ApiProperty({
    description: 'Created',
    example: '2023-10-02T13:02:02.735Z'
  })
  modifiedAt: Date
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

  @ApiProperty({
    description: 'Released Date of the Manga',
    example: '2023',
  })
  @IsString()
  @IsNotEmpty()
  releaseDate: string;

  @ApiProperty({
    description: 'list containing manga genres',
    type: () => [GenresDto]
  })
  genres: GenresDto[]

  @ApiProperty({
    description: 'MANGA, MANHWA, MANHUA, NOVEL or COMIC',
    example: 'MANGA',
  })
  @IsString()
  @IsOptional()
  type: string

  @ApiProperty({
    description: 'number of view in manga',
    example: 123,
  })
  viewsCount: number

  @ApiProperty({
    description: 'List of chapters',
    type: () => [ChapterResponseDto],
  })
  chapters?: ChapterResponseDto[];

}

export class MangaResponsePaginatedDto extends PaginationDto {
  @ApiProperty({
    description: 'Array of Manga Data',
    type: () => [MangaResponseDto]
  })
  data: MangaResponseDto[]
}

export class GenresDto { 
  @ApiProperty({
    description: 'Id',
    example: 1,
  })
  id: number
  @ApiProperty({
    description: 'Name of Genrer',
    example: 'SEINEN',
  })
  name: string
}