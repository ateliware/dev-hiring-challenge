import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { FavoriteORM } from './entities';
import { FavoriteArgs, FavoriteService, UnfavoriteArgs } from '.';

@ApiTags('Trio')
@Controller('/favorite')
export class TrioController {
  constructor(private readonly service: FavoriteService) {}

  @Get('/')
  @HttpCode(200)
  @ApiOperation({ description: 'Fetch favorited repositories' })
  @ApiResponse({ status: 200, type: [FavoriteORM] })
  @ApiResponse({
    status: 404,
    description: 'Entity not found. See error object.',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  all() {
    return this.service.all();
  }

  @Post('/')
  @HttpCode(201)
  @ApiOperation({ description: 'Favorite repos' })
  @ApiResponse({ status: 201, type: [FavoriteORM] })
  @ApiResponse({ status: 401 })
  @ApiResponse({
    status: 404,
    description: 'Entity not found. See error object.',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiBody({ type: [FavoriteArgs] })
  favorite(@Body() data: FavoriteArgs[]) {
    return this.service.favorite(data);
  }

  @Delete('/')
  @HttpCode(200)
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 401 })
  @ApiResponse({
    status: 404,
    description: 'Entity not found. See error object.',
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiBody({ type: [UnfavoriteArgs] })
  unfavorite(@Body() data: UnfavoriteArgs[]) {
    return this.service.unfavorite(data.map((favorite) => favorite.id));
  }
}
