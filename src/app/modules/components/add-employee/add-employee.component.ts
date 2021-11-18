import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/config/services/config.service';
import { NotificationService } from 'src/app/config/services/notification.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  constructor(
    public configService: ConfigService,
    public notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
  }


  onClear() {
    this.configService.form.reset();
    this.configService.initializeFormGroup();
  }

  onSubmit() {
    if (this.configService.form.valid) {
      let employeeForm = this.configService.form.value;
      this.configService.addNewEmployee(employeeForm.name, employeeForm.lastName, employeeForm.position, employeeForm.salary);
      this.configService.form.reset();
      this.configService.initializeFormGroup();
      this.notificationService.success(':: Submitted succesfully');
      console.log(employeeForm.name);
      console.log(employeeForm.lastName);
      console.log(employeeForm.position);
      console.log(employeeForm.salary);
    }
  }
}
