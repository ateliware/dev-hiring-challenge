import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import {Repository} from '../entities/repository';

@Injectable()
export class HerokuService {

  constructor(private httpCli: HttpClient) { }

  getSaved(): Observable<Repository[]> {
    return this.httpCli.get<Repository[]>('https://beltraoluis-dev-challenge.herokuapp.com/repos');
  }

  save(repo: Repository): Observable<any> {
    return this.httpCli.post<any>('https://beltraoluis-dev-challenge.herokuapp.com/set/repo', repo);
  }
}
