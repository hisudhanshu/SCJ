import { Component } from '@angular/core';

interface RawMaterial {
  id: number;
  name: string;
}

interface Recipe {
  name: string;
  selectedRawMaterial: number | undefined;
}

interface CreatedRecipe extends Recipe {
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  isEditing: boolean = false;
  selectedProduct: string | undefined;
  selectedProductDisplay: string | undefined;
  selectedRawMaterial: number | undefined;
  addedRawMaterials: RawMaterial[] = [];
  rawMaterials: RawMaterial[] = [
    { id: 1, name: 'Material 1' },
    { id: 2, name: 'Material 2' },
    { id: 3, name: 'Material 3' }
  ];
  recipes: Recipe[] = [];
  createdRecipes: CreatedRecipe[] = [];
  editIndex: number | undefined;

  openRecipeScreen() {
    this.selectedProductDisplay = this.selectedProduct;
    if (this.selectedProduct) {
      const matchingRecipes = this.createdRecipes.filter((recipe) => recipe.name === this.selectedProduct);
      if (matchingRecipes.length > 0) {
        this.recipes = matchingRecipes.map((recipe) => ({
          name: recipe.name,
          selectedRawMaterial: recipe.selectedRawMaterial
        }));
      } else {
        this.recipes = [];
        this.addRecipe();
      }
    }
  }

  addRawMaterial() {
    const selectedMaterial = this.rawMaterials.find(mat => mat.id === this.selectedRawMaterial);
    if (selectedMaterial) {
      this.addedRawMaterials.push(selectedMaterial);
      this.selectedRawMaterial = undefined;
    }
  }

  addRecipe() {
    const newRecipe: Recipe = {
      name: this.selectedProduct || '',
      selectedRawMaterial: undefined
    };
    this.recipes.push(newRecipe);
  }

  removeRecipe(index: number) {
    this.recipes.splice(index, 1);
  }

  getRawMaterialName(rawMaterialId: number | undefined): string {
    const material = this.rawMaterials.find(mat => mat.id === rawMaterialId);
    return material ? material.name : '';
  }

  createProduct() {
    if (
      !this.selectedProduct ||
      this.recipes.length === 0 ||
      this.recipes.some(recipe => recipe.selectedRawMaterial === undefined)
    ) {
      alert('Please fill in all fields.');
      return;
    }

    const createdRecipe: CreatedRecipe = {
      name: this.recipes[0].name,
      selectedRawMaterial: this.recipes[0].selectedRawMaterial,
    };
    this.createdRecipes.push(createdRecipe);
    this.saveRecipesToLocalStorage();

    this.resetForm();
  }

  editRecipe(index: number) {
    const recipe = this.createdRecipes[index];
    this.selectedProduct = recipe.name;
    this.recipes = [{ name: recipe.name, selectedRawMaterial: recipe.selectedRawMaterial }];
    this.addedRawMaterials = [];
    this.selectedProductDisplay = undefined;
    this.editIndex = index;
  }

  deleteRecipe(index: number) {
    this.createdRecipes.splice(index, 1);
    this.saveRecipesToLocalStorage();
  }

  ngOnInit() {
    this.loadRecipesFromLocalStorage();
  }

  private loadRecipesFromLocalStorage() {
    const storedRecipes = localStorage.getItem('createdRecipes');
    if (storedRecipes) {
      this.createdRecipes = JSON.parse(storedRecipes);
    }
  }

  private saveRecipesToLocalStorage() {
    localStorage.setItem('createdRecipes', JSON.stringify(this.createdRecipes));
  }

  private resetForm() {
    this.selectedProduct = undefined;
    this.selectedProductDisplay = undefined;
    this.selectedRawMaterial = undefined;
    this.addedRawMaterials = [];
    this.recipes = [];
  }
}