import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteORM } from '../entities';
import { In, Repository } from 'typeorm';
import { FavoriteArgs } from './favorite.args';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(FavoriteORM)
    private repository: Repository<FavoriteORM>,
  ) {}

  public all() {
    return this.repository.find();
  }

  private byRepoIds(repoIds: number[]) {
    return this.repository.find({
      where: {
        repo_id: In(repoIds),
      },
    });
  }

  public async favorite(data: FavoriteArgs[]) {
    //To ensure we don't overpass 5 favorite languages we get a list of favorites.
    const favorites = await this.byRepoIds(
      data?.map((favorite) => favorite.repo_id),
    );

    // Then we map in a way that we can have repositories by Language
    const basedOnLanguage = favorites?.reduce(
      (root, favorite) => ((root[favorite.language] = favorite.repo_id), root),
      {},
    );

    // We now verify if we have more than 5 languages
    if (Object.keys(basedOnLanguage)?.length > 5) {
      throw new UnauthorizedException({
        error: "Can't have more than 5 languages.",
      });
    }

    // Ensure language is lowercase
    data = data.map((favorite) => ({
      ...favorite,
      language: favorite.language.toLowerCase(),
    }));

    return this.repository.save(data);
  }

  public unfavorite(repoIds: number[]) {
    return this.repository.delete({
      repo_id: In(repoIds),
    });
  }
}
