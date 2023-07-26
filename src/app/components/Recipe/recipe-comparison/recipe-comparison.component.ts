import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/Service/auth-services.service';

@Component({
  selector: 'app-recipe-comparison',
  templateUrl: './recipe-comparison.component.html',
  styleUrls: ['./recipe-comparison.component.css']
})
export class RecipeComparisonComponent implements OnInit {

  selectedProduct: string = '';
  selectedProduct1: string = '';
  showComparisonResults: boolean = false;
  editMode: boolean = false;


  // Properties for editing
  createdRecipeCategory: string = 'Small';
  createdRecipeClientType: string = 'Clay';
  createdRecipeBrand: string = 'Type A';
  createdRecipeCustomer: string = 'Deepak Tiwari';
  createdRecipeMaterialName: string = 'Polythiene';
  createdRecipeCode: string = 'P83912';
  createdRecipeType: string = 'Small Type';
  createdRecipeQuantity: number = 100;
  createdRecipeCostPerUnit: number = 1000;
  createdRecipeVendor: string = 'Vendor New';
  createdRecipeStock: number = 1000;
  recipes: any[] = []; // Array to store all recipes data
  filteredRecipes: any[] = []; // Array to store filtered recipes data
  searchKeyword: string = ''; // Variable to store the search keyword
  selectedRecipe: any = null;

  actualRecipeCategory: string = 'Normal';
  actualRecipeClientType: string = 'Claylogix';
  actualRecipeBrand: string = 'Type B';
  actualRecipeCustomer: string = 'Rahul Sir';
  actualRecipeMaterialName: string = 'Nylon';
  actualRecipeCode: string = 'N83912';
  actualRecipeType: string = 'Large Type';
  actualRecipeQuantity: number = 200;
  actualRecipeCostPerUnit: number = 2000;
  actualRecipeVendor: string = 'Vendor Old';
  actualRecipeStock: number = 2000;

  constructor(private authService: AuthServicesService) { }

  ngOnInit(): void {
    this.authService.getRecipescompare().subscribe(
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

  // searchRecipes(): void {
  //   if (this.searchKeyword.trim() === '') {
  //     this.filteredRecipes = this.recipes; // If search keyword is empty, show all recipes
  //   } else {
  //     this.filteredRecipes = this.recipes.filter(recipe =>
  //       recipe.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
  //     );
  //   }
  // }

  showDetails(event: Event): void {
    const selectedRecipeName = (event.target as HTMLSelectElement).value;
    if (selectedRecipeName === '') {
      this.selectedRecipe = null; // If no recipe is selected, reset the selectedRecipe variable
    } else {
      this.selectedRecipe = this.filteredRecipes.find(recipe => recipe.name === selectedRecipeName);
    }
  }

  compareRecipes(): void {
    // Implementation of comparison logic (if needed)
    // You can perform additional operations here based on the selectedProduct and selectedRecipe values.
    // This function will be called when the "Compare" button is clicked.

    // Show comparison results
    this.showComparisonResults = true;
  }
  saveChanges(): void {
    // Save the changes made in the edit mode
    // Perform any necessary operations to save the changes

    this.editMode = false;
  }

  cancelChanges(): void {
    // Cancel the changes made in the edit mode
    // Reset the values to their original state

    this.editMode = false;
  }

}
