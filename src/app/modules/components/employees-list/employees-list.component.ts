import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/config/services/config.service';


@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {
  employeeObj: any;

  constructor(
    private configService: ConfigService,
  ) {


  }

  getEmployeeList() {
    this.configService.getEmployeeList().then(
      (res) => {
        this.employeeObj = res
        console.log(this.employeeObj)
      }
    ); 
  }


  ngOnInit(): void {
    this.getEmployeeList();

  }


}
