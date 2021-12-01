import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Imports for API
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from './config/services/config.service';


// Imports components
import { NavbarComponent } from './modules/components/navbar/navbar.component';
import { EmployeesListComponent } from './modules/components/employees-list/employees-list.component';
import { AddEmployeeComponent } from './modules/components/add-employee/add-employee.component';
import { EditEmployeeComponent } from './modules/components/edit-employee/edit-employee.component';

// Imports modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EmployeesListComponent,
    AddEmployeeComponent,
    EditEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    FontAwesomeModule,
    NoopAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    ConfigService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [AddEmployeeComponent]
})
export class AppModule { }
