import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigService } from 'src/app/config/services/config.service';

import { NotificationService } from 'src/app/config/services/notification.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})

export class EditEmployeeComponent implements OnInit {

  message:string;

  employeeObj: any;
  searchValue: any;
  searchKey: string;
  
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['name','lastName','position','salary','actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  

  constructor(
    public configService: ConfigService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<EditEmployeeComponent>,
  ) { }

  onClear() {
    this.configService.form.reset();
    this.configService.initializeFormGroup();
  }

  getEmployeeList() 
  {
    this.configService.getEmployeeList().then(
      (res) => {
        this.employeeObj = res
        console.log(1, this.employeeObj)
        this.listData = new MatTableDataSource(this.employeeObj);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        this.employeeObj = [...this.employeeObj]
      }
    );
  }
  
  onSubmit() {
    if (this.configService.form.valid) {
      let employeeForm = this.configService.form.value;
      this.configService.updateEmployee(employeeForm.id,employeeForm.name, employeeForm.last_name, employeeForm.position, employeeForm.salary);
      this.configService.form.reset();
      this.configService.initializeFormGroup();
      this.notificationService.success(':: Submitted succesfully');
      
      this.onClose();
    }
  }
  
  onClose() { 
    this.configService.form.reset();
    this.configService.initializeFormGroup();
    this.dialogRef.close();
  }


  
  ngOnInit(): void {
    
  }
  
}