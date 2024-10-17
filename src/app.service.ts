import { Injectable } from '@nestjs/common';
import { DriveLog } from '@prisma/client';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<DriveLog[]> {
    return await this.prisma.driveLog.findMany();
  }

  async save(log: DriveLog) {
    let distance = log.odoEnd - log.odoStart;
    if (log.id) {
      await this.prisma.driveLog.update({
        where: { id: log.id },
        data: {
          timestamp: new Date(log.timestamp),
          destination: log.destination,
          odoStart: log.odoStart,
          odoEnd: log.odoEnd,
          distance: distance,
        },
      });
    } else {
      await this.prisma.driveLog.create({
        data: {
          timestamp: new Date(log.timestamp),
          destination: log.destination,
          odoStart: log.odoStart,
          odoEnd: log.odoEnd,
          distance: distance,
        },
      });
    }
  }

  async delete(logId: number) {
    await this.prisma.driveLog.delete({ where: { id: logId } });
  }
}
