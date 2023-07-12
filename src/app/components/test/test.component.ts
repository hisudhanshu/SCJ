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
    this.authService.getRecipes1().subscribe(
      (response: any) => {
        if (response.isSuccess && response.productJson !== null) {
          this.filteredRecipes = JSON.parse(response.productJson);
        } else {
          console.log('API request failed or no data received');
        }
      },
      (error: any) => {
        console.log('Error fetching recipes:', error);
      }
    );

    this.authService.getRecipes().subscribe(
      (response: any) => {
        if (response.isSuccess && response.jsonData !== null) {
          this.recipesData = JSON.parse(response.jsonData);
        } else {
          console.log('API request failed or no data received');
        }
      },
      (error: any) => {
        console.log('Error fetching materials:', error);
      }
    );
    }    
    showDetails(recipeData: any) {
      this.selectedRecipe = recipeData;
    }
  searchRecipes(): void {
    // No filtering is required for object data
  }
  
}

interface Recipe {
  Id: number;
  name: string;
  category: string;
  brand: string;
  customer: string;
  clienttype: string;
  materials: Material[];
}

interface Material {
  Id: number;
  productName: string;
  materialName: string;
  code: string;
  type: string;
  quantity: number;
  cost: number;
  vendor: string;
  stock: number;
}
