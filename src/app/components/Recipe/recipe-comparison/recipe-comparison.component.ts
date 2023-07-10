import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-comparison',
  templateUrl: './recipe-comparison.component.html',
  styleUrls: ['./recipe-comparison.component.css']
})
export class RecipeComparisonComponent implements OnInit {

  selectedProduct: string = '';
  selectedRecipe: string = '';
  showComparisonResults: boolean = false;
  editMode: boolean = false;
  
  // Properties for editing
  createdRecipeCategory: string = 'Small';
  createdRecipeClientType: string = 'Clay';
  createdRecipeBrand: string = 'Type A';
  createdRecipeMaterialName: string = 'Polythiene';
  createdRecipeCode: string = 'P83912';
  createdRecipeType: string = 'Small Type';
  createdRecipeQuantity: number = 100;
  createdRecipeCostPerUnit: number = 1000;
  createdRecipeVendor: string = 'Vendor New';
  createdRecipeStock: number = 1000;

  actualRecipeCategory: string = 'Hard';
  actualRecipeClientType: string = 'SCJ';
  actualRecipeBrand: string = 'Type B';
  actualRecipeMaterialName: string = 'Rubber';
  actualRecipeCode: string = 'R83012';
  actualRecipeType: string = 'Hard Type';
  actualRecipeQuantity: number = 200;
  actualRecipeCostPerUnit: number = 2000;
  actualRecipeVendor: string = 'Vendor Clay';
  actualRecipeStock: number = 2000;

  constructor() { }

  ngOnInit(): void {
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


  // addData(): void {
  //   this.selectedProduct = (document.getElementById('name') as HTMLSelectElement).value;
  //   this.selectedRecipe = (document.getElementById('Recipe') as HTMLSelectElement).value;
  //   localStorage.setItem('selectedProduct', this.selectedProduct);
  //   localStorage.setItem('selectedRecipe', this.selectedRecipe);
  //   this.showModal();
  // }

  // showModal(): void {
  //   const modal = document.getElementsByClassName('modal')[0] as HTMLElement;
  //   modal.style.display = 'block';
  // }

  // saveChanges(): void {
  //   // Handle save changes functionality here
  //   const modal = document.getElementsByClassName('modal')[0] as HTMLElement;
  //   modal.style.display = 'none';
  // }

