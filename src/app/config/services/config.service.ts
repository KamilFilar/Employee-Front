import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class ConfigService {
  
  private baseUrl = 'http://localhost:8000/api/employee';
  private headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
  };

  constructor(
    private htpp: HttpClient
  ) { }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    id: new FormControl(null),
    name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    salary: new FormControl('', Validators.required)
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      id: null,
      name: '',
      last_name: '',
      position: '',
      salary: ''
    })
  }

  populateForm(Employee: any) {
    this.form.patchValue(Employee);
  }

  getEmployeeList() 
  {
    return this.htpp.get(this.baseUrl, { headers: this.headers }).toPromise();
  }

  getEmployeeByID(employeeID: Number) 
  {
    let url = this.baseUrl + '/' + employeeID.toString();
    return this.htpp.get(url, { headers: this.headers }).toPromise();
  }

  addNewEmployee(name: String, lastName: String, position: String, salary: Number) 
  {
    let newEmployee = {
      name: name,
      last_name: lastName,
      position: position,
      salary: salary
    }

    return this.htpp.post<any>(this.baseUrl, JSON.stringify(newEmployee), { headers: this.headers }).subscribe({
      next: data => {
        console.log(data);
      },
      error: err => {
        throw err;
      }
    });
  }

  updateEmployee(employeeID: Number, name: String, lastName: String, position: String, salary: Number) 
  {
    let url = this.baseUrl + '/' + employeeID.toString();
    let employee = {
      name: name,
      last_name: lastName,
      position: position,
      salary: salary
    }

    return this.htpp.put(url, JSON.stringify(employee), { headers: this.headers }).subscribe({
      next: data => {
        console.log(data);
      },
      error: err => {
        throw err;
      }
    });
  }

  removeEmployee(employeeID: Number) 
  {
    let url = this.baseUrl + '/' + employeeID.toString();
    return this.htpp.delete(url, { headers: this.headers}).toPromise();
  }

}