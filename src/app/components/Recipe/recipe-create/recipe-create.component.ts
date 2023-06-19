import { Component } from '@angular/core';
import { AuthServicesService } from 'src/app/Service/auth-services.service';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent {
  recipeData: any = {};
  savedRecipes: any[] = [];
  isEditing: boolean = false;
  editingIndex: number = -1;
  rawMaterialsData: any[] = []; // Variable to store the raw materials data

  constructor(private authService: AuthServicesService) {}
  onSubmit() {
    if (this.isEditing) {
      if (confirm("Are you sure you want to update the recipe?")) {
        // Update recipe in the savedRecipes array
        this.savedRecipes[this.editingIndex] = { ...this.recipeData };
        this.isEditing = false;
        this.editingIndex = -1;
        alert("Recipe updated successfully!");
      }
    } else {
      const existingRecipe = this.savedRecipes.find(recipe => recipe.product === this.recipeData.product);
      if (existingRecipe) {
        alert("Recipe already exists!");
      } else {
        if (confirm("Are you sure you want to save the recipe?")) {
          // Add new recipe to the savedRecipes array
          this.savedRecipes.push({ ...this.recipeData });
          alert("Recipe created successfully!");
        }
      }
    }

    this.recipeData = {}; // Reset the form data
  }

  editRecipe(index: number) {
    if (!this.isEditing || confirm("Are you sure you want to discard the changes and edit this recipe?")) {
      this.recipeData = { ...this.savedRecipes[index] };
      this.isEditing = true;
      this.editingIndex = index;
    }
  }

  deleteRecipe(index: number) {
    if (confirm("Are you sure you want to delete the recipe?")) {
      this.savedRecipes.splice(index, 1);
      alert("Recipe deleted successfully!");
    }
  }
  getRawMaterialsrecipe(): void {
    this.authService.getRawMaterialsrecipe().subscribe(
      (data: any) => {
        this.rawMaterialsData = data; // Assign the raw materials data from the API response
      },
      (error: any) => {
        console.error('Failed to fetch raw materials data:', error);
      }
    );
  }
}
