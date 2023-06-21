import { Component } from '@angular/core';

interface RawMaterial {
  id: number;
  name: string;
}

interface Recipe {
  name: string;
  selectedRawMaterial: number | undefined;
  selectedElement: number | undefined; // New property for element dropdown
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
  selectedElement: number | undefined; // New property for element dropdown
  addedRawMaterials: RawMaterial[] = [];
  addedElements: RawMaterial[] = []; // New array for added elements
  rawMaterials: RawMaterial[] = [
    { id: 1, name: 'Material 1' },
    { id: 2, name: 'Material 2' },
    { id: 3, name: 'Material 3' }
  ];
  elements: RawMaterial[] = [ // New array for elements dropdown
    { id: 1, name: 'Element 1' },
    { id: 2, name: 'Element 2' },
    { id: 3, name: 'Element 3' }
  ];
  recipes: Recipe[] = [];
  createdRecipes: CreatedRecipe[] = [];
  editIndex: number | undefined;
  isRecipeUpdated: boolean = false;

  openRecipeScreen() {
    this.selectedProductDisplay = this.selectedProduct;
    if (this.selectedProduct) {
      const matchingRecipes = this.createdRecipes.filter((recipe) => recipe.name === this.selectedProduct);
      if (matchingRecipes.length > 0) {
        this.recipes = matchingRecipes.map((recipe) => ({
          name: recipe.name,
          selectedRawMaterial: recipe.selectedRawMaterial,
          selectedElement: recipe.selectedElement
        }));
      } else {
        this.recipes = [];
        this.addRecipe();
      }
      this.isRecipeUpdated = false;
    }
  }

  addRawMaterial() {
    const selectedMaterial = this.rawMaterials.find(mat => mat.id === this.selectedRawMaterial);
    if (selectedMaterial) {
      this.addedRawMaterials.push(selectedMaterial);
      this.selectedRawMaterial = undefined;
    }
  }

  addElement() { // New method for adding elements
    const selectedElement = this.elements.find(el => el.id === this.selectedElement);
    if (selectedElement) {
      this.addedElements.push(selectedElement);
      this.selectedElement = undefined;
    }
  }

  addRecipe() {
    const newRecipe: Recipe = {
      name: this.selectedProduct || '',
      selectedRawMaterial: undefined,
      selectedElement: undefined // Initialize element dropdown value as undefined
    };
    this.recipes.push(newRecipe);
  }

  removeRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.isRecipeUpdated = false;
  }

  getRawMaterialName(rawMaterialId: number | undefined): string {
    const material = this.rawMaterials.find(mat => mat.id === rawMaterialId);
    return material ? material.name : '';
  }

  getElementName(elementId: number | undefined): string { // New method to get element name
    const element = this.elements.find(el => el.id === elementId);
    return element ? element.name : '';
  }

  createProduct() {
    if (
      !this.selectedProduct ||
      this.recipes.length === 0 ||
      this.recipes.some(recipe => recipe.selectedRawMaterial === undefined || recipe.selectedElement === undefined) // Check for undefined element selection
    ) {
      alert('Please fill in all fields.');
      return;
    }

    const createdRecipe: CreatedRecipe = {
      name: this.recipes[0].name,
      selectedRawMaterial: this.recipes[0].selectedRawMaterial,
      selectedElement: this.recipes[0].selectedElement // Add selectedElement property to createdRecipe
    };

    const isRecipeExists = this.createdRecipes.some((recipe) => recipe.name === createdRecipe.name && recipe.selectedRawMaterial === createdRecipe.selectedRawMaterial && recipe.selectedElement === createdRecipe.selectedElement); // Check for matching recipe including element selection
    if (isRecipeExists) {
      alert('Recipe already exists.');
      return;
    }

    if (this.isEditing && this.editIndex !== undefined) {
      this.createdRecipes[this.editIndex] = createdRecipe;
    } else {
      this.createdRecipes.push(createdRecipe);
    }

    this.saveRecipesToLocalStorage();

    this.resetForm();
  }

  editRecipe(index: number) {
    const recipe = this.createdRecipes[index];
    this.selectedProduct = recipe.name;
    this.recipes = [{ name: recipe.name, selectedRawMaterial: recipe.selectedRawMaterial, selectedElement: recipe.selectedElement }];
    this.addedRawMaterials = [];
    this.addedElements = []; // Reset addedElements array
    this.selectedProductDisplay = undefined;
    this.isEditing = true;
    this.editIndex = index;
    this.isRecipeUpdated = true;
  }

  deleteRecipe(index: number) {
    this.createdRecipes.splice(index, 1);
    this.saveRecipesToLocalStorage();
  }

  updateRecipe() {
    if (
      !this.selectedProduct ||
      this.recipes.length === 0 ||
      this.recipes.some(recipe => recipe.selectedRawMaterial === undefined || recipe.selectedElement === undefined) // Check for undefined element selection
    ) {
      alert('Please fill in all fields.');
      return;
    }

    const updatedRecipe: CreatedRecipe = {
      name: this.recipes[0].name,
      selectedRawMaterial: this.recipes[0].selectedRawMaterial,
      selectedElement: this.recipes[0].selectedElement // Add selectedElement property to updatedRecipe
    };

    const isRecipeExists = this.createdRecipes.some((recipe, index) => index !== this.editIndex && recipe.name === updatedRecipe.name && recipe.selectedRawMaterial === updatedRecipe.selectedRawMaterial && recipe.selectedElement === updatedRecipe.selectedElement); // Check for matching recipe including element selection
    if (isRecipeExists) {
      alert('Recipe already exists.');
      return;
    }

    this.createdRecipes[this.editIndex!] = updatedRecipe;

    this.saveRecipesToLocalStorage();

    this.resetForm();
    this.isRecipeUpdated = false;
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
    this.selectedElement = undefined; // Reset selectedElement
    this.addedRawMaterials = [];
    this.addedElements = []; // Reset addedElements array
    this.recipes = [];
    this.isEditing = false;
    this.editIndex = undefined;
  }
}
