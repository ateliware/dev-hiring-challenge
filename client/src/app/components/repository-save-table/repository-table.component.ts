import {Component, OnInit, ViewChild} from '@angular/core';
import {RepositoryModel} from "../../shared/repository.model";
import {AppService} from "../../services/app.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {animate, state, style, transition, trigger} from "@angular/animations";


@Component({
  selector: 'app-repo-save-table',
  templateUrl: './repository-table.component.html',
  styleUrls: ['./repository-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
    ])
  ]
})
export class RepositorySaveTableComponent implements OnInit {

  repositoryModel = new RepositoryModel();
  getDisplayedColumnsSave = this.repositoryModel.getDisplayedColumnsSave();
  dataSourceSave = new MatTableDataSource();
  expandedElementSave = null;
  loadingSave = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private service: AppService) {
  }

  ngOnInit() {

  }

  findReporitories() {
    this.loadingSave = true;
    this.service.getAllTrending().then((response: any) => {
      this.dataSourceSave.data = response['Repository'];
      this.dataSourceSave.sort = this.sort;
      this.dataSourceSave.paginator = this.paginator;
      this.loadingSave = false;
    }).catch((err) => this.loadingSave = false);
  }

  applyFilterSave(filterValue?: string) {
    this.dataSourceSave.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceSave.paginator) {
      this.dataSourceSave.paginator.firstPage();
    }
  }

}
