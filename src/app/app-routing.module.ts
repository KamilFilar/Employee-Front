import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDetailsComponent } from './modules/components/employee-details/employee-details.component';
import { EmployeesListComponent } from './modules/components/employees-list/employees-list.component';
import { AddEmployeeComponent } from './modules/components/add-employee/add-employee.component';

const routes: Routes = [
  { path: '', component: EmployeesListComponent },
  { path: 'employee-details/:id', component: EmployeeDetailsComponent },
  { path: 'add', component: AddEmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
