import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/Service/auth-services.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  recipes: any[] = []; // Array to store all recipes data
  filteredRecipes: any[] = []; // Array to store filtered recipes data
  searchKeyword: string = ''; // Variable to store the search keyword
  selectedRecipe: any;

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

  editRecipe(recipe: any): void {
    recipe.isEditing = true; // Set 'isEditing' property to true for the selected recipe
  }

  updateRecipe(recipe: any): void {
    // Implement your logic for updating a recipe
    console.log('Update recipe:', recipe);
    recipe.isEditing = false; // Set 'isEditing' property back to false after updating
  }

// Component logic
deleteRecipe(material: any) {
  // Find the index of the material in the selectedMaterial array
  const index = this.selectedRecipe.indexOf(material);
  
  if (index !== -1) {
    // Remove the material from the selectedMaterial array
    this.selectedRecipe.splice(index, 1);
    
    // Optionally, you can perform additional logic such as sending an HTTP request to delete the material from the server
    
    console.log('Deleted material:', material);
  }
}

  saveRecipe(recipe: any): void {
    // Implement your logic for saving the edited recipe
    console.log('Save recipe:', recipe);
  }
  // Inside your component class
openModal(recipe: any) {
  this.selectedRecipe = recipe;
}

}
