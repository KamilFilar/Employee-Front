import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesListComponent } from './modules/components/employees-list/employees-list.component';
import { AddEmployeeComponent } from './modules/components/add-employee/add-employee.component';

const routes: Routes = [
  { path: '', component: EmployeesListComponent },
  { path: 'add', component: AddEmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
