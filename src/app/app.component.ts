import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],  
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class AppComponent implements OnInit {
  public employees: Employee[] | undefined;
  public editEmployee: Employee | undefined;
  public deleteEmployee: Employee | undefined;

  constructor(private employeeService: EmployeeService){}

  ngOnInit() {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        console.log(this.employees);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddEmployee(addForm: NgForm): void {
    const addEmployeeForm = document.getElementById('add-employee-form');
    if (addEmployeeForm) {
      addEmployeeForm.click();
    }
    console.log(addForm.value)
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        "console.log(response);"
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateEmployee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onDeleteEmployee(employeeId: number | undefined): void {
    if (employeeId === undefined) {
      // Handle the undefined case, e.g., show an error message or return early
      console.error('Employee ID is undefined.');
      return;
    }
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchEmployees(key: string): void {
    console.log(key);
    const results: Employee[] = [];
  
    if (this.employees) {
      for (const employee of this.employees) {
        if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
          results.push(employee);
        }
      }
    }
  
    // Update the employees array with the results
    this.employees = results;
  
    // If there are no results and the search key is not empty, set employees to an empty array
    if (results.length === 0 && key) {
      this.employees = [];
    } else if (!key) {
      this.getEmployees(); // Reset to all employees if search key is cleared
    }
  }
  

  public onOpenModal(employee: Employee | undefined, mode: string): void {
    const container = document.getElementById('main-container');
    if (!container) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container.appendChild(button);
    button.click();
  }
}
