import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RepairRecordModule } from './repair-record/repair-record.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo/dist/drivers/apollo.driver';
import { ApolloDriverConfig } from '@nestjs/apollo/dist/interfaces/apollo-driver-config.interface';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    RepairRecordModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql')
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'dahami123', 
      database: 'repairs', 
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true, 
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
