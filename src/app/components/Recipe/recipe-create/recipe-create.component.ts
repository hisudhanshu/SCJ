import { AuthServicesService } from 'src/app/Service/auth-services.service';
import { Component, OnInit } from '@angular/core';

interface Recipe {
  recipeName: string;
  recipeCode: string;
  rawMaterial: string;
  rawMaterialElement: string;
  rawMaterialRequired: number;
}

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent implements OnInit {
  recipeData: any = {};
  savedRecipes: any[] = [];
  isEditing: boolean = false;
  editingIndex: number = -1;
  rawMaterialsData: any[] = []; // Variable to store the raw materials data
  nextId: number = 1; // Variable to track the next recipe ID
  rawElements: any[] = [];
  selectedMaterialName: string | undefined;
  columnData: string[] = [];
  filteredData: any[] = [];
  materialDropdownData: string[] = [];
  selectedRawMaterial: string | undefined;
  selectedRawElement: string | undefined;
  selectedFilteredItem: any;

  constructor(private authService: AuthServicesService) { }

  ngOnInit() {
    this.authService.getRawElements().subscribe(
      (data: any) => {
        this.rawElements = data.matdata.filter((item: any) => item.name !== "");
        if (this.rawElements.length > 0) {
          this.columnData = Object.keys(this.rawElements[0]).filter((key) => key !== 'id' && key !== 'name') as string[];
        }
      },
      (error: any) => {
        console.error('Failed to fetch raw elements:', error);
      }
    );
  }

  onNameSelected(name: string) {
    this.selectedMaterialName = name;
    const selectedItem = this.rawElements.find((item: any) => item.name === name);
    if (selectedItem) {
      this.filteredData = [selectedItem];
      this.materialDropdownData = Object.values(selectedItem).slice(2).filter((value: any, index: number) => typeof value === 'string' && value !== '' && index > 15) as string[];
    } else {
      this.filteredData = [];
      this.materialDropdownData = [];
    }
    this.selectedRawMaterial = undefined; // Reset the selected raw material
    this.selectedRawElement = undefined; // Reset the selected raw element
  }

  getItemLabel(item: any): string {
    return this.columnData.map(column => item[column]).join(' | ');
  }

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
          // Add new recipe to the savedRecipes array with an ID
          this.recipeData.id = this.nextId;
          this.recipeData.rawMaterials = this.selectedRawMaterial; // Include the selected raw material
          this.recipeData.rawElements = this.selectedRawElement; // Include the selected raw element
          this.savedRecipes.push({ ...this.recipeData });
          this.nextId++;
          alert("Recipe created successfully!");
        }
      }
    }

    this.recipeData = {}; // Reset the form data
    this.selectedRawMaterial = undefined; // Reset the selected raw material
    this.selectedRawElement = undefined; // Reset the selected raw element
  }

  editRecipe(index: number) {
    if (!this.isEditing || confirm("Are you sure you want to discard the changes and edit this recipe?")) {
      this.recipeData = { ...this.savedRecipes[index] };
      this.selectedRawMaterial = this.recipeData.rawMaterials; // Set the selected raw material
      this.selectedRawElement = this.recipeData.rawElements; // Set the selected raw element
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
}
