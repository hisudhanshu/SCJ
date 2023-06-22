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
        material: 'Hard Plastic',
        element: 'Nylon',
        category: 'category A',
        brand: 'Indica',
        customerName: 'SCJ',
        polymer: 'Polymer 1'
      };
    } else if (this.selectedProduct === 'bottle') {
      this.recipeData = {
        material: 'Oxidation',
        element: 'Polytheine',
        category: 'category B',
        brand: 'Kent',
        customerName: 'Clay',
        polymer: 'Polymer 2'
      };
    } else if (this.selectedProduct === 'plastic') {
      this.recipeData = {
        material: 'Ethyliene',
        element: 'Element',
        category: 'category C',
        brand: 'TATA',
        customerName: 'Claylogix',
        polymer: 'Polymer 3'
      };
    } else {
      // No product selected, reset the recipe data
      this.recipeData = {};
    }
  }
}
