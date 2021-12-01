import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ConfigService } from 'src/app/config/services/config.service';
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

export class EmployeesListComponent implements OnInit {
  employeeObj: any;
  searchValue: any;
  searchKey: string;
  
  
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['name','lastName','position','salary','actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(
    private configService: ConfigService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
  ) {
    
  }
  

  getEmployeeList() 
  {
    this.configService.getEmployeeList().then(
      (res) => {
        this.employeeObj = res
        this.listData = new MatTableDataSource(this.employeeObj);
        this.listData.sortingDataAccessor = (item, property) => {
          switch(property) {
            case 'lastName': return item.last_name;
            default: return item[property];
          }
        };
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.employeeObj = [...this.employeeObj]
      }
    );
  }

  refresh() {
    this.getEmployeeList();
    this.searchKey = "";
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
    const dial = this.dialog.open(AddEmployeeComponent,DIALOG_CONFIG);
    dial.afterClosed().subscribe(() => {
      this.refresh();
    })
  }

  onEdit(row: any) {
    this.configService.populateForm(row);
    const DIALOG_CONFIG = new MatDialogConfig();
    DIALOG_CONFIG.disableClose = true;
    DIALOG_CONFIG.autoFocus = true;
    DIALOG_CONFIG.width = "60%";
    const EDIT_DIAL = this.dialog.open(EditEmployeeComponent,DIALOG_CONFIG);
    
    EDIT_DIAL.afterClosed().subscribe(()=>{
      this.refresh();
    });
  }

   onDelete(id: Number) {
    if(confirm('Areyou sure to delete this employee?')){
    this.configService.removeEmployee(id).then(
      (res) => {
        console.log(res);
        this.getEmployeeList();
        
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


  ngOnInit(): void {
    this.getEmployeeList();
    //this.dataService.currentMessage.subscribe(message => this.message = message);
    
    
  }

}
