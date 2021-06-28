import { AnimationItem } from 'lottie-web';
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
  // the state of the data loading
  loading: boolean = true;
  // API response status
  success: boolean = false;
  // API error too many requests
  error: boolean;
  // retry button text
  retry: string = 'retry';
  // the failure animation selector
  private failureAnimation: AnimationItem;
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
    // hidding the table until we fetch the data from the API.
    document.getElementById('container').hidden = true;
    this.fetchData('initialiser');
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

  fetchData(clickedBy: string) {
    // fetch the employees.
    this.employeeService.getEmployees().subscribe(
      (employees) => {
        // puting our data inside our dataSource.
        this.dataSource = new MatTableDataSource(employees.data);
        // setting up the paginator and the sort.
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // changing the error and success state since the data has been successfully fetched.
        this.error = false;
        this.success = true;
        // if this function is triggred throught the retry button we have to disable the hidden property in our table.
        if (clickedBy === 'retry') {
          const table = document.getElementById('container');
          table.classList.add('fade-in-table');
          table.hidden = false;
        }
      },
      (error) => {
        if (clickedBy === 'retry') {
          // we fire an animation to inform the user that we couldn't get the data.
          document.getElementById('failure').hidden = false;
          this.failureAnimation.goToAndPlay(0);
          // we update the retry button text to retry again after it's first call.
          this.retry = 'retry again';
        }
        // we show our erreur message since we couldn't fetch the data.
        this.error = true;
        this.loading = false;
      }
    );
  }

  // function triggred when our loader's animation is done
  loaderDone(animationItem: AnimationItem) {
    if (this.success === true) {
      // hidding the loader as fast as possible.
      this.loading = false;
      document.getElementById('loader').hidden = true;

      // showing the table and adding the fade-in animation.
      const table = document.getElementById('container');
      table.classList.add('fade-in-table');
      table.hidden = false;
    }
  }

  // we get the failure animation so we can start it programmaticaly later.
  failureCreated(animationItem: AnimationItem) {
    this.failureAnimation = animationItem;
  }

  // when the failure animation is done we hide it.
  failureDone(animationItem: AnimationItem) {
    document.getElementById('failure').hidden = true;
  }
}
