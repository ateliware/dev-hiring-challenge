import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_CONFIG} from '../app.setings';

@Injectable()
export class AppService {

  constructor(private http: HttpClient) {
  }

  getAllTrendingApi(language: string) {
    return new Promise((resolve, reject) => this.http.get(`${API_CONFIG.url}github?language=${language}`)
      .toPromise().then(res => resolve(res), error => reject(error)));
  }

  getAllTrending() {
    return new Promise((resolve, reject) => this.http.get(`${API_CONFIG.url}repository`, )
      .toPromise().then(res => resolve(res), error => reject(error)));
  }

  saveRepositories(data: any) {
    return new Promise((resolve, reject) => this.http.post(`${API_CONFIG.url}repository`, data)
      .toPromise().then(res => resolve(res), error => reject(error)));
  }
}
