import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import {Repository} from '../entities/repository';

@Injectable()
export class GithubService {

  constructor(private httpCli: HttpClient) { }

  getTrending(language: string): Observable<Repository[]> {
    return this.httpCli.get<Repository[]>(`https://github-trending-api.now.sh/repositories?language=${language}&since=daily`);
  }
}
