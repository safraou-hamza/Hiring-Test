import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { EMPLOYEE } from '../../models/EMPLOYEE';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {
  // this reflects the state of the dataSource after each filter operation
  empty: boolean = false;
  // table header
  displayedColumns: string[] = [
    'id',
    'employee_name',
    'employee_age',
    'employee_salary',
  ];
  // dataSource contains the data retrieved from our API
  dataSource: MatTableDataSource<EMPLOYEE>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // inside the constructor we called our service
  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    // fetch the employees
    this.employeeService.getEmployees().subscribe((employees) => {
      this.dataSource = new MatTableDataSource(employees?.data);
      // setting up the paginator and the sort
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // filtering the dataSource
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    //in case we have a higher data than our maximum number of item per page  we set our paginator to the first page
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    // after each filter we verify if the dataSource is empty or not
    this.dataSource.filteredData.length === 0
      ? (this.empty = true)
      : (this.empty = false);
  }
}
