import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchKeyword: string = '';

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
  }

  sidebarToggle() {
    // toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }

  signOut() {
    // Clear data in localStorage when signing out
    localStorage.clear();
  }

  search() {
    // Perform search functionality here
    // You can access the searchKeyword property and perform the necessary search operations
    // For example:
    console.log('Search keyword:', this.searchKeyword);
    // Perform search logic here
  }
}
