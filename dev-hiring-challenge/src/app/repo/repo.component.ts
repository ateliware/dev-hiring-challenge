import {Component, Input, OnInit} from '@angular/core';
import {Repository} from '../entities/repository';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.sass']
})
export class RepoComponent implements OnInit {
  @Input() repo: Repository;
  details = false;
  detailsButton = 'mais';

  constructor() { }

  ngOnInit() {
  }

  changeDetails() {
    this.details = !this.details;
    if (this.details) {
      this.detailsButton = 'menos';
    } else {
      this.detailsButton = 'mais';
    }
  }

}
