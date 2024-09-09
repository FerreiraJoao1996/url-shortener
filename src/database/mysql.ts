import { ConfigModule, ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { UsersEntity } from 'src/users/entities/users.entity';

export const Mysql = [
  {
    // provide: 'PORTAL',
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: configService.get('DB_TYPE'),
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        database: configService.get('DB_DATABASE'),
        password: configService.get('DB_PASSWORD'),
        logging: false,
        omitNull: true,
      });
      sequelize.addModels([UsersEntity]);
      await sequelize.sync();
      return sequelize;
    },
    inject: [ConfigService],
  },
];
