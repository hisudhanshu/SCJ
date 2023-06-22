import { Component } from '@angular/core';

@Component({
  selector: 'app-product-material',
  templateUrl: './product-material.component.html',
  styleUrls: ['./product-material.component.css']
})
export class ProductMaterialComponent {
  selectedProduct: string = '';
  recipeData: any = {}; // Initialize empty recipe data

  openRecipeScreen(): void {
    if (this.selectedProduct === 'household') {
      this.recipeData = {
        material: 'Material 1',
        element: 'Element 1',
        customerName: 'Customer 1',
        polymer: 'Polymer 1'
      };
    } else if (this.selectedProduct === 'bottle') {
      this.recipeData = {
        material: 'Material 2',
        element: 'Element 2',
        customerName: 'Customer 2',
        polymer: 'Polymer 2'
      };
    } else if (this.selectedProduct === 'plastic') {
      this.recipeData = {
        material: 'Material 3',
        element: 'Element 3',
        customerName: 'Customer 3',
        polymer: 'Polymer 3'
      };
    } else {
      // No product selected, reset the recipe data
      this.recipeData = {};
    }
  }
}
