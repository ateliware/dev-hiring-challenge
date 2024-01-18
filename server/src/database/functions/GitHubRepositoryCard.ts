import { getConnection, getRepository } from "typeorm";
import { TGitHubRepositoryCard } from "../../interfaces/GitHubRepositoryCard";
import { GitHubRepositoryCard } from "../entity/GitHubRepositoryCard";

export class GitHubRepositoryCardDatabaseHandler {

  static async insertOne (repository: TGitHubRepositoryCard) {
    try {

      const insert = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(GitHubRepositoryCard)
      .values(repository as Partial<GitHubRepositoryCard>)
      .execute()

      return insert
      
    } catch (error) {
      console.log(error)
    }
  }

  static async insertMany (repositories: TGitHubRepositoryCard[]) {
    try {

      for (let repository of repositories) {
        await this.insertOne(repository)
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  static async getAll () {
    try {

      const repositories = await getRepository(GitHubRepositoryCard)
      .createQueryBuilder('ghrc')
      .getMany()

      return repositories

    } catch (error) {
      console.log(error)
    }
  }

  static async deleteAll () {
    try {

      const result = await getRepository(GitHubRepositoryCard)
      .createQueryBuilder('ghrc')
      .delete()   
      .execute()

      return result

    } catch (error) {
      console.log(error)
    }
  }
  
}