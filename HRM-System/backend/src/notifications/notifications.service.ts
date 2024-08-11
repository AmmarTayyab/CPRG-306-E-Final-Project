import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import CryptoService from '../lib/hashing';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class NotificationsService {
  private cryptoService = new CryptoService();

  constructor(private prisma: PrismaService) {}

  async create({ message, sender, receiver, type }: CreateNotificationDto) {
    const encryptedMessage = await this.cryptoService.encryptMessage(message);
    await this.prisma.notification.create({
      data: {
        message: encryptedMessage,
        sender,
        receiver,
        type,
      },
    });
    return {
      status: 'success',
      message: 'Notification created successfully',
    };
  }

  async getNotifications(userId: string): Promise<any[]> {
    const notifications = await this.prisma.notification.findMany({
      where: {
        receiver: userId,
      },
    });

    return Promise.all(
      notifications.map(async (notification) => {
        try {
          const decryptedMessage = await this.cryptoService.decryptMessage(
            notification.message,
          );
          return {
            ...notification,
            message: decryptedMessage,
          };
        } catch (error) {
          console.error('Error decrypting message:', error);
          return {
            ...notification,
            message: 'Error decrypting message',
          };
        }
      }),
    );
  }
}
