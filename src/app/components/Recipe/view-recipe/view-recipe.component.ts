import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/Service/auth-services.service';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.css']
})
export class ViewRecipeComponent implements OnInit {
  recipes: any[] = []; // Array to store all recipes data
  filteredRecipes: any[] = []; // Array to store filtered recipes data
  searchKeyword: string = ''; // Variable to store the search keyword

  constructor(private authService: AuthServicesService) { }

  ngOnInit(): void {
    this.authService.getRecipes().subscribe(
      (response: any) => {
        if (response.isSuccess && response.jsonData !== null) {
          this.recipes = JSON.parse(response.jsonData);
          this.filteredRecipes = this.recipes; // Initialize filteredRecipes with all recipes
        } else {
          console.log('API request failed or no data received');
        }
      },
      (error: any) => {
        console.log('Error fetching materials:', error);
      }
    );
  }

  searchRecipes(): void {
    if (this.searchKeyword.trim() === '') {
      this.filteredRecipes = this.recipes; // If search keyword is empty, show all recipes
    } else {
      this.filteredRecipes = this.recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    }  
}
}