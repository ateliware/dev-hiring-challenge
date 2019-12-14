import {FormControl, FormGroup} from "@angular/forms";

export class RepositoryModel {

  constructor(repository?: RepositoryModel) {
    if (repository) {
      for (const key in repository) {
        if (repository.hasOwnProperty(key)) {
          this[key] = repository[key];
        }
      }
    }
  }

  getFormFilter(): FormGroup {
    return new FormGroup({
      search: new FormControl(''),
      language: new FormControl('')
    });
  }

  getDisplayedColumns() {
    return [
      'select',
      'author',
      'avatar',
      'currentPeriodStars',
      'forks',
      'language',
      'name',
      'stars',
      'url',
      'description',
    ];
  }

  getDisplayedColumnsSave() {
    return [
      'author',
      'avatar',
      'currentPeriodStars',
      'forks',
      'language',
      'name',
      'stars',
      'url',
      'description',
    ];
  }

}
