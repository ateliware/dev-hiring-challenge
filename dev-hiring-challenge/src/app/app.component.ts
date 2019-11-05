import { Component } from '@angular/core';
import {GithubService} from './apis/github.service';
import {Repository} from './entities/repository';
import {HerokuService} from './apis/heroku.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'dev-hiring-challenge';
  repos: Repository[] = [];
  savedRepos: Repository[] = [];

  constructor(private github: GithubService,
              private heroku: HerokuService) {
    heroku.getSaved().subscribe (repos => {
      if (repos !== undefined && repos.length >= 1) {
        this.savedRepos = repos;
      }
    });
  }

  private findTrendRepo(language: string) {
    this.github.getTrending(language).subscribe( repos => {
      if (repos.length > 0) {
        let tmp: Repository;
        repos.forEach( repo => {
          if (tmp !== undefined) {
            if (repo.stars > tmp.stars) {
              tmp = repo;
            }
          } else {
            tmp = repo;
          }
        });
        console.log(`${tmp.language}: ${tmp.author}/${tmp.name}`);
        this.repos.push(tmp);
      }
    });
  }

  findRepos() {
    this.repos = [];
    this.findTrendRepo('kotlin');
    this.findTrendRepo('java');
    this.findTrendRepo('typescript');
    this.findTrendRepo('python');
    this.findTrendRepo('c');
  }

  save() {
    this.repos.forEach(repo => {
      this.heroku.save(repo).subscribe();
    });
  }
}
