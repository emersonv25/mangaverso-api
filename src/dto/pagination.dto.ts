import { ApiProperty } from "@nestjs/swagger";
import { IsInt, Min } from "class-validator";

export class PaginationDto<T> {
    data : T

    @ApiProperty({
        description: 'Current page number',
        example: 1,
      })
      @IsInt()
      currentPage: number;
    
      @ApiProperty({
        description: 'Total number of pages',
        example: 1,
      })
      @IsInt()
      @Min(1)
      totalPages: number;
    
      @ApiProperty({
        description: 'Total count of records',
        example: 1,
      })
      @IsInt()
      @Min(0)
      totalCount: number;
}