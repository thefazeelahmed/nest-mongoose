import {
  Controller,
  Param,
  Delete,
  HttpCode,
  Res,
  Req,
  Get,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string, @Res() response: Response) {
    return this.usersService.remove(id, response);
  }

  @Get()
  findAll(@Req() request: Request, @Res() response: Response, @Query() query) {
    console.log(request);
    return this.usersService.findAll(query, response);
  }
}
