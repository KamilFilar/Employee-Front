import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ConfigService } from 'src/app/config/services/config.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  employeeObj: any;

  constructor(
    private route: ActivatedRoute,
    private configService: ConfigService,
  ) {
    this.employeeObj = {
      id: 0,
      name: '',
      lastName: '',
      position: '',
      salary: 0
    }
  }

  getEmployeeByID() {
    this.configService.getEmployeeByID(this.employeeObj.id).then(
      (res) => {
        this.employeeObj = res
        console.log(this.employeeObj)
      }
    )
  }

  ngOnInit(): void {
    this.employeeObj.id = this.route.snapshot.params['id'];
    this.getEmployeeByID();
  }

}
