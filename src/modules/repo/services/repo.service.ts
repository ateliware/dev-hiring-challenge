import { Injectable } from '@nestjs/common'
import { CreateRepoInput } from '../dto/create-repo.input'
import { UpdateRepoInput } from '../dto/update-repo.input'

@Injectable()
export class RepoService {
  create(createRepoInput: CreateRepoInput) {
    return 'This action adds a new repo'
  }

  findAll() {
    return `This action returns all repo`
  }

  findOne(id: number) {
    return `This action returns a #${id} repo`
  }

  update(id: number, updateRepoInput: UpdateRepoInput) {
    return `This action updates a #${id} repo`
  }

  remove(id: number) {
    return `This action removes a #${id} repo`
  }
}
