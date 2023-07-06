import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/Service/auth-services.service';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.css']
})
export class ViewRecipeComponent implements OnInit {
  selectedProduct: string | null = null;
  recipes: Recipe[] = [];

  constructor(private authService: AuthServicesService) {}

  ngOnInit(): void {}

  selectProduct(event: Event) {
    const target = event.target as HTMLSelectElement;
    const product = target.value;
    this.selectedProduct = product;
    this.loadRecipes();
  }

  loadRecipes() {
    if (this.selectedProduct === 'Bottle') {
      this.recipes = [
        { name: 'Recipe 1', ingredients: 'Ingredient 1, Ingredient 2' },
        { name: 'Recipe 2', ingredients: 'Ingredient 3, Ingredient 4' }
      ];
    } else if (this.selectedProduct === 'Glass') {
      this.recipes = [
        { name: 'Recipe 1', ingredients: 'Ingredient 5, Ingredient 6' },
        { name: 'Recipe 2', ingredients: 'Ingredient 7, Ingredient 8' }
      ];
    } else if (this.selectedProduct === 'Household') {
      this.recipes = [
        { name: 'Recipe 1', ingredients: 'Ingredient 9, Ingredient 10' },
        { name: 'Recipe 2', ingredients: 'Ingredient 11, Ingredient 12' }
      ];
    } else {
      this.recipes = [];
    }
  }
}

interface Recipe {
  name: string;
  ingredients: string;
}
