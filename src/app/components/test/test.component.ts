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
  selectedTypeOfPolymer: string | undefined;
  selectedCustomerName: string | undefined;
  selectedRawElement: string | undefined;
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
  selectedTypeOfPolymer: string | undefined;
  selectedCustomerName: string | undefined;
  selectedRawElement: string | undefined;
  typesOfPolymers: string[] = ['Polymer 1', 'Polymer 2', 'Polymer 3'];
  customerNames: string[] = ['Customer 1', 'Customer 2', 'Customer 3'];
  rawElements: string[] = ['Element 1', 'Element 2', 'Element 3'];
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
    this.selectedTypeOfPolymer = ''; // Reset the selected type of polymer
    this.selectedCustomerName = ''; // Reset the selected customer name
    this.selectedRawElement = ''; // Reset the selected raw element
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
      !this.selectedTypeOfPolymer ||
      !this.selectedCustomerName ||
      !this.selectedRawElement ||
      this.recipes.length === 0 ||
      this.recipes.some(recipe => recipe.selectedRawMaterial === undefined)
    ) {
      alert('Please fill in all fields.');
      return;
    }

    const createdRecipe: CreatedRecipe = {
      name: this.recipes[0].name,
      selectedRawMaterial: this.recipes[0].selectedRawMaterial,
      selectedTypeOfPolymer: this.selectedTypeOfPolymer,
      selectedCustomerName: this.selectedCustomerName,
      selectedRawElement: this.selectedRawElement
    };
    this.createdRecipes.push(createdRecipe);
    this.saveRecipesToLocalStorage();

    this.resetForm();
  }

  editRecipe(index: number) {
    const recipe = this.createdRecipes[index];
    this.selectedProduct = recipe.name;
    this.selectedTypeOfPolymer = recipe.selectedTypeOfPolymer;
    this.selectedCustomerName = recipe.selectedCustomerName;
    this.selectedRawElement = recipe.selectedRawElement;
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
    this.selectedTypeOfPolymer = undefined;
    this.selectedCustomerName = undefined;
    this.selectedRawElement = undefined;
  }
}