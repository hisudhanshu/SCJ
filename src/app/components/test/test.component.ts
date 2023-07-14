import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/Service/auth-services.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  recipesData: any[] = [];
  selectedRecipe: any;
  filteredRecipes: any[] = []; // Array to store filtered recipe data
  searchKeyword: string = ''; // Variable to store the search keyword
  recipes: any;

  constructor(private authService: AuthServicesService) {}

 ngOnInit(): void {
   
 }}