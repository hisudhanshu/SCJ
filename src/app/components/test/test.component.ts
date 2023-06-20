import { Component } from '@angular/core';

interface Recipe {
  recipeId: string;
  product: string;
  material: string;
  element: string;
  quantity: string;
  price: string;
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  addingRecipe: boolean = false;
  selectedProduct: string = '';
  selectedMaterial: string = '';
  selectedElement: string = '';
  quantity: string = '';
  price: string = '';
  recipes: Recipe[] = [];

  saveRecipe() {
    if (
      this.selectedProduct &&
      this.selectedMaterial &&
      this.selectedElement &&
      this.quantity &&
      this.price
    ) {
      if (!this.addingRecipe) {
        const newRecipe: Recipe = {
          recipeId: '',
          product: this.selectedProduct,
          material: this.selectedMaterial,
          element: this.selectedElement,
          quantity: this.quantity,
          price: this.price
        };

        this.recipes.push(newRecipe);

        // Show success alert message or perform any desired action here

        // Reset form values
        this.resetForm();
      } else {
        // Update existing recipe
        const updatedRecipe = this.recipes.find(
          recipe =>
            recipe.product === this.selectedProduct &&
            recipe.recipeId === ''
        );

        if (updatedRecipe) {
          updatedRecipe.material = this.selectedMaterial;
          updatedRecipe.element = this.selectedElement;
          updatedRecipe.quantity = this.quantity;
          updatedRecipe.price = this.price;

          // Show success alert message or perform any desired action here

          // Reset form values
          this.resetForm();
          this.addingRecipe = false;
        }
      }
    }
  }

  addAnotherRecipe(product: string) {
    const newRecipe: Recipe = {
      recipeId: '',
      product: product,
      material: '',
      element: '',
      quantity: '',
      price: ''
    };
    this.recipes.push(newRecipe);
    this.addingRecipe = true;
    this.selectedProduct = product;
  }

  resetForm() {
    this.selectedProduct = '';
    this.selectedMaterial = '';
    this.selectedElement = '';
    this.quantity = '';
    this.price = '';
  }
}
