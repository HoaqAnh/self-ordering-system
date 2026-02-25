import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItemEntity } from './entities/menu-item.entity';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(MenuItemEntity)
    private readonly menuRepository: Repository<MenuItemEntity>,
  ) {}

  async createMenuItem(dto: CreateMenuItemDto): Promise<MenuItemEntity> {
    const newItem = this.menuRepository.create(dto);
    return await this.menuRepository.save(newItem);
  }

  async getMenu(): Promise<MenuItemEntity[]> {
    return await this.menuRepository.find({
      order: { createdAt: 'DESC' },
    });
  }
}
