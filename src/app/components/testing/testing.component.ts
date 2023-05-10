import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {
  showTable = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleTable(): void {
    this.showTable = !this.showTable;
  }
}