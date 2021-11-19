import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/config/services/config.service';
import { NotificationService } from 'src/app/config/services/notification.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {


  constructor(
    public configService: ConfigService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<EditEmployeeComponent>,
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
      this.configService.updateEmployee(employeeForm.id,employeeForm.name, employeeForm.lastName, employeeForm.position, employeeForm.salary);
      this.configService.form.reset();
      this.configService.initializeFormGroup();
      this.notificationService.success(':: Submitted succesfully');
      this.onClose();
      console.log(employeeForm.id);
      console.log(employeeForm.name);
      console.log(employeeForm.lastName);
      console.log(employeeForm.position);
      console.log(employeeForm.salary);
      

    }
  }

  
  onClose() { 
    this.configService.form.reset();
    this.configService.initializeFormGroup();
    this.dialogRef.close();
  }

  
}