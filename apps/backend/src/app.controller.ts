import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';

@Controller('menu')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getMenu() {
    return await this.appService.getMenu();
  }

  @Post()
  async createMenuItem(@Body() createMenuItemDto: CreateMenuItemDto) {
    return await this.appService.createMenuItem(createMenuItemDto);
  }
}
