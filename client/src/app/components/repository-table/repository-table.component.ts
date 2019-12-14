import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from "@angular/animations";
import { FormGroup } from "@angular/forms";
import { RepositoryModel } from "../../shared/repository.model";
import { SelectionModel } from "@angular/cdk/collections";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { AppService } from "../../services/app.service";


@Component({
  selector: 'app-repo-table',
  templateUrl: './repository-table.component.html',
  styleUrls: ['./repository-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
    ])
  ]
})
export class RepositoryTableComponent implements OnInit {

  formFilter: FormGroup;
  repositoryModel = new RepositoryModel();
  displayedColumns = this.repositoryModel.getDisplayedColumns();
  dataSource = new MatTableDataSource();
  selection = new SelectionModel<object>(true, []);
  expandedElement = null;
  loading = false;
  length = 100;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private service: AppService) {
  }

  ngOnInit() {
    this.formFilter = this.repositoryModel.getFormFilter();
  }

  findTrendRepo(language: any) {
    this.loading = true;
    this.service.getAllTrendingApi(language.value).then((response: object[]) => {
      this.dataSource.data = response;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    }).catch((err) => this.loading = false);
  }

  applyFilter(filterValue?: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach((row: any) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }


  save() {
    console.log(this.selection.selected);
    this.service.saveRepositories(this.selection.selected).then((response: object[]) => {

    });
  }
}
