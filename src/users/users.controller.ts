import {
  Controller,
  Param,
  Delete,
  HttpCode,
  Res,
  Req,
  Get,
  Query,
  Patch,
  Body,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
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
    return this.usersService.findAll(query, response);
  }

  @Patch(':id')
  updateOne(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() response: Response,
  ) {
    return this.usersService.update(id, updateUserDto, response);
  }
}
