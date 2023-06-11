import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Joi from 'joi';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NODE_ENV, TYPEORM_CONFIG } from '../../../config/constants';
import { configs } from '../../../config/backend.config';
import { DatabaseModule } from '../../database/src';
import { validation } from './shared/utils/validationSchema';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // TypeOrmModule.forRootAsync({
	// 	inject: [ConfigService],
	// 	useFactory: (configService: ConfigService) => ({...configService.get(TYPEORM_CONFIG)}),
	// }),
	ConfigModule.forRoot({
		isGlobal: true,
		//load: [configs],
		envFilePath: `.${process.env.NODE_ENV}.env`,
		//validationSchema: Joi.object<typeof validation>(validation)
	}),
	UsersModule,
	DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}