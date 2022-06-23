import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { RepoModule } from './modules/repo/repo.module'
import { SharedModule } from './modules/shared/shared.module'

@Module({
  imports: [
    SharedModule,
    RepoModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: process.env.NODE_ENV !== 'production',
      autoSchemaFile: true
    })
  ]
})
export class AppModule {}
