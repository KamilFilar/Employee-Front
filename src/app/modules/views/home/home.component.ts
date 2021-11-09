import { Component, OnInit } from '@angular/core';
// Import config service -> all API methods are listed here
import { ConfigService } from 'src/app/config/services/config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})

export class HomeComponent implements OnInit {

  // Example of constructor
  constructor(
    private configService: ConfigService
  ) { }

  // Example of call method from API
  getUserList(){
    this.configService.getEmployeeList(); // Click to go to the method
  }

  ngOnInit(): void {
  }

}
