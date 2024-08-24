import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { AppComponent } from './app.component';
import { EmployeeService } from './employee.service';

@NgModule({
  declarations: [
    AppComponent, // Declare the AppComponent
  ],
  imports: [
    BrowserModule, // Import BrowserModule for running the app in a browser
    FormsModule,   // Import FormsModule to use ngModel and other form-related directives
  ],
  providers: [EmployeeService], // Provide the EmployeeService for dependency injection
  bootstrap: [AppComponent] // Bootstrap the AppComponent at application startup
})
export class AppModule { }
