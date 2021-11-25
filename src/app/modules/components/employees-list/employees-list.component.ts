import { ChangeDetectorRef, Component, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { ConfigService } from 'src/app/config/services/config.service';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { NotificationService } from 'src/app/config/services/notification.service';


@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit, OnChanges {
  employeeObj: any;
  searchValue: any;
  faSort = faSort;

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['id','name','lastName','position','salary','actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(
    public configService: ConfigService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private changeDetectorRefs: ChangeDetectorRef,
  ) {

  }
  ngOnChanges(): void {
    this.refresh();
  }

  getEmployeeList() {
    this.configService.getEmployeeList().then(
      (res) => {
        this.employeeObj = res
        this.listData = new MatTableDataSource(this.employeeObj);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        console.log(this.employeeObj)
        this.employeeObj = [...this.employeeObj]
      }
    );
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    this.configService.initializeFormGroup();
    const DIALOG_CONFIG = new MatDialogConfig();
    DIALOG_CONFIG.disableClose = true;
    DIALOG_CONFIG.autoFocus = true;
    DIALOG_CONFIG.width = "60%";
    this.dialog.open(AddEmployeeComponent,DIALOG_CONFIG);
  }

  onEdit(row: any) {
    this.configService.populateForm(row);
    const DIALOG_CONFIG = new MatDialogConfig();
    DIALOG_CONFIG.disableClose = true;
    DIALOG_CONFIG.autoFocus = true;
    DIALOG_CONFIG.width = "60%";
    this.dialog.open(EditEmployeeComponent,DIALOG_CONFIG);
  }

  onDelete(id: Number) {
    if(confirm('Are you sure to delete this employee?')){
    this.configService.removeEmployee(id).then(
      (res) => {
        console.log(res);
        this.refresh();
      }
    ).catch(
      (error) => {
        console.log(error)
      }
    )
    this.notificationService.warn('! Deleted succesfully');
    console.log("employee with id "+id+" deleted")
    }
  }

  refresh() {
    this.configService.getEmployeeList().then(
      (res) => {
        console.log("xd")
        this.employeeObj = res
        this.changeDetectorRefs.detectChanges();
        console.log(this.employeeObj)
      }
    );
  }

  ngOnInit(): void {
    this.getEmployeeList();
  }



}
