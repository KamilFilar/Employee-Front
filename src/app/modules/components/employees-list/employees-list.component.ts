import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/config/services/config.service';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {
  employeeObj: any;
  searchValue: any;
  faSort = faSort;

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['name','lastName','position','salary','actions'];

  constructor(
    public configService: ConfigService,
  ) {


  }

  getEmployeeList() {
    this.configService.getEmployeeList().then(
      (res) => {
        this.employeeObj = res
        this.listData = new MatTableDataSource(this.employeeObj);
        console.log(this.employeeObj)
      }
    );
    // this.listData = new MatTableDataSource(this.employeeObj); 
  }



  ngOnInit(): void {
     this.getEmployeeList();
    // this.configService.getEmployeeList().then(
    //   (res) => {
    //     this.employeeObj = res
    //     this.listData = new MatTableDataSource(this.employeeObj); 
    //     console.log(this.employeeObj)
    //   }
      
    // );
    
  }



}
