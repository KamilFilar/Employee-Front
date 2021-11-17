import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/config/services/config.service';
import { faSort } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {
  employeeObj: any;
  searchValue: any;
  faSort = faSort;

  constructor(
    public configService: ConfigService,
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

  onClear() {
    this.configService.form.reset();
    this.configService.initializeFormGroup();
  }

}
