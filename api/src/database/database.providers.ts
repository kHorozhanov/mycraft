import { join } from 'path';
import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '../common/services/config.service';

export const databaseProviders = [
  {
    provide: 'SequelizeToken',
    useFactory: async (config: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: config.get('DATABASE_HOST'),
        port: 3306,
        modelPaths: [join(__dirname, '../**/*.entity.*')],
        username: config.get('DATABASE_USER'),
        password: config.get('DATABASE_PASSWORD'),
        database: config.get('DATABASE_NAME'),
        dialectOptions: {
          ssl: 'Amazon RDS'
        },
        define: {
          charset: 'utf8',
          collate: 'utf8_general_ci',
        },
      });
      await sequelize.sync();
      return sequelize;
    },
    inject: [ConfigService],
  },
];