import { Controller, Get } from '@nestjs/common';

@Controller('books')
export class BooksController {

  @Get()
  getAllBooks() {
    return [
      { id: 1, title: 'Book One', author: 'Author One' },
      { id: 2, title: 'Book Two', author: 'Author Two' },
      { id: 3, title: 'Book Three', author: 'Author Three' }
    ];
  }
}
