import { Controller, Get } from '@nestjs/common';
import { MenuItem } from '@self-ordering/types';

@Controller('menu')
export class AppController {
  @Get()
  getMenu(): MenuItem[] {
    return [
      { id: '1', name: 'Phở Bò Kobe', price: 95000 },
      { id: '2', name: 'Cà phê Sữa đá', price: 29000 },
      { id: '3', name: 'Bánh mì Pate', price: 25000 },
    ];
  }
}
