import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DriveLog } from '@prisma/client';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get('api/logs')
  async getAll(): Promise<DriveLog[]> {
    return await this.appService.getAll();
  }

  @Post('api/logs')
  async create(@Body() log: DriveLog): Promise<void> {
    await this.appService.save(log);
  }

  @Delete('api/logs/:log')
  async delete(@Param('log') log: string): Promise<void> {
    await this.appService.delete(parseInt(log));
  }
}
