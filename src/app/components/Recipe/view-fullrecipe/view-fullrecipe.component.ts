import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthServicesService } from 'src/app/Service/auth-services.service';
import { Input } from '@angular/core';

interface Material {
  id: number;
  p_id: number;
  name: string;
  m_code: string;
  m_type: string;
  m_cost: string;
  m_Vendor: string;
  m_inventory: string;
  mquantity: string;
}

interface Element {
  id: number;
  data: string;
}

interface RequestData {
  id: number;
  [key: string]: string | number;
}

@Component({
  selector: 'app-view-fullrecipe',
  templateUrl: './view-fullrecipe.component.html',
  styleUrls: ['./view-fullrecipe.component.css']
})
export class ViewFullrecipeComponent implements OnInit {

  productDetails: any[] = []; // Assuming you have an array of objects here for your existing rows
  newMaterial: any = {}; // Empty object for the new row
  showBlankRow = false; // Flag to control whether the blank row should be displayed

  selectedProductId: number | null = null;
  recipesData: any[] = [];
  @Input() selectedRecipe: any;
  filteredRecipes: any[] = [];
  searchKeyword: string = '';
  recipes: any;
  isAscending: boolean = true;
  sortColumn: string = '';
  isModalOpen: boolean = false;
  productId!: string;

  // productDetails: any;

  isEditingName = false;
  isEditingCategory = false;
  isEditingBrand = false;
  isEditingCustomer = false;
  isEditingClientType = false;
  products: any;
  SelectedMaterial: string[] = [];

  // Declare flag variables
  isFlag1Selected: boolean = false;
  isFlag2Selected: boolean = false;


  materials: Material[] = [];
  showMaterialDropdowns = false;

  // Existing code...

  selectedMaterialId: number = 0;
  selectedMaterialData: Material | undefined;
  isEditing: boolean = false;

  selectedMaterial: any[] = [];
  elements: Element[] = [];
  successMessage: string = '';
  isEditMode: boolean = false;
  editIndex: number = -1;

  rawElements: any[] = [];
  selectedMaterialName: string | undefined;
  columnData: string[] = [];
  filteredData: any[] = [];
  materialDropdownData: string[] = [];
  selectedFilteredItem: any;
  showDropdowns: boolean | undefined;

  newProduct: any = {
    // p_id: 0,
    flag: 2,
    name: '',
    category: '',
    brand: '',
    customer: '',
    clientType: '',
    SelectedMaterial: this.selectedMaterial,
  };

  constructor(private authService: AuthServicesService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.productId = res['id'];
    });

    // Retrieve the recipe details from localStorage
    const recipeDetailsString = localStorage.getItem('selectedProduct');
    if (recipeDetailsString) {
      // If there is data in localStorage, parse it as JSON and assign it to the selectedRecipe variable
      this.selectedRecipe = JSON.parse(recipeDetailsString);
    }

    this.authService.getRecipes().subscribe(
      (response: any) => {
        if (response.isSuccess && response.jsonData !== null) {
          this.recipesData = JSON.parse(response.jsonData);
          this.productDetails = this.recipesData.filter((item) => {
            if (item.P_Id == this.productId) {
              return item;
            }
          });
        } else {
          console.log('API request failed or no data received');
        }
      },
      (error: any) => {
        console.log('Error fetching materials:', error);
      }
    );

    this.authService.getMaterials().subscribe((response: any) => {
      if (response.isSuccess && response.matdata !== null) {
        this.materials = response.matdata;
      } else {
        console.log('API request failed or no data received');
      }
    });
    this.authService.getRawElements().subscribe(
      (data: any) => {
        this.rawElements = data.matdata.filter((item: any) => item.name !== '');
        if (this.rawElements.length > 0) {
          this.columnData = Object.keys(this.rawElements[0]).filter((key) => key !== 'id' && key !== 'name') as string[];
        }
      },
      (error: any) => {
        console.error('Failed to fetch raw elements:', error);
      }
    );

    this.authService.getRecipes1().subscribe(
      (response: any) => {
        if (response.isSuccess && response.productJson !== null) {
          this.filteredRecipes = JSON.parse(response.productJson);
        } else {
          console.log('API request failed or no data received');
        }
      },
      (error: any) => {
        console.log('Error fetching recipes:', error);
      }
    );
  }

  // Rest of your methods...

  sortTable(column: string) {
    if (column === this.sortColumn) {
      // If the same column is clicked again, reverse the sort order
      this.isAscending = !this.isAscending;
    } else {
      // If a different column is clicked, set it as the new sort column
      this.sortColumn = column;
      this.isAscending = true;
    }

    this.filteredRecipes.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (valueA < valueB) {
        return this.isAscending ? -1 : 1;
      } else if (valueA > valueB) {
        return this.isAscending ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  // Function to retrieve the product by ID
  getProductById(productId: number): any {
    return this.filteredRecipes.find((recipe: any) => recipe.Id === productId);
  }

  searchRecipes(): void {
    const keyword = this.searchKeyword.toLowerCase().trim();
    if (keyword === '') {
      this.filteredRecipes = [...this.recipesData];
    } else {
      this.filteredRecipes = this.recipesData.filter(recipe =>
        recipe.name.toLowerCase().includes(keyword) ||
        recipe.category.toLowerCase().includes(keyword) ||
        recipe.brand.toLowerCase().includes(keyword) ||
        recipe.customer.toLowerCase().includes(keyword) ||
        recipe.clienttype.toLowerCase().includes(keyword)
      );
    }
  }

  search() {
    this.filteredRecipes = this.recipesData.filter((item: { name: string }) =>
      item.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
    );
  }

  // Functionality for editing and updating material details
  editMaterial(material: any) {
    material.isEditing = true;
  }

  updateMaterial(material: any) {
    // Implement the logic to update the material details
    material.isEditing = false;
  }

  getSelectedProductMaterials() {
    // Implement the logic to get selected product materials
    // and update this.selectedMaterial array
  }

  editProduct() {
    this.isEditing = true;
  }

  updateProduct() {
    this.isEditing = false;
    // Here you can perform any update logic or API call if needed.
    // Update the properties in the selectedRecipe object.
  }

  deleteProduct() {
    const index = this.products.findIndex((product: any) => product === this.selectedRecipe);
    if (index !== -1) {
      this.products.splice(index, 1); // Remove the selected recipe from the list.
    }
    this.selectedRecipe = null; // Clear the selected recipe after deletion.
  }

  // Assuming you have defined the Material interface

  onMaterialChange(event: any): void {
    const selectedMaterialName = event.target.value;

    if (selectedMaterialName) {
      this.selectedMaterialData = this.getMaterialDataByName(selectedMaterialName);
    } else {
      this.selectedMaterialData = undefined;
    }
  }

  getMaterialDataByName(name: string): Material | undefined {
    return this.materials.find((material: Material) => material.name === name);
  }

  // deleteMaterial(material: Material) {
  //   // Perform the necessary logic to delete the material
  //   // e.g., call an API or update the data in your service
  //   console.log('Deleting material:', material);
  // }

  toggleEditing() {
    this.isEditing = !this.isEditing;
  }

  onAddButtonClick(): void {
    if (this.selectedMaterialData) {
      this.selectedMaterial.push(this.selectedMaterialData);
    }
  }

  calculatePrice(): void {
    if (this.selectedMaterialData && this.selectedMaterialData.mquantity) {
      const quantity = parseFloat(this.selectedMaterialData.mquantity);
      this.selectedMaterialData.m_cost = (quantity * 100).toString();
    }
  }

  addMaterial() {
    if (this.selectedMaterialData) {
      const newMaterialData = { ...this.selectedMaterialData }; // Create a copy of the selectedMaterialData
      this.productDetails.push(newMaterialData);

      // Call the MaterialService to insert the new material data
      this.authService.insertProductData(newMaterialData).subscribe(
        (response: any) => {
          console.log('Material data inserted successfully:', response);
          // Handle success if needed
        },
        (error: any) => {
          console.error('Error occurred while inserting material data:', error);
          // Handle error if needed
        }
      );

      // Save the selected material data in localStorage
      localStorage.setItem('selectedMaterialData', JSON.stringify(newMaterialData));
    }

    // Reset the selectedMaterialData and hide the blank row after adding a new material
    this.selectedMaterialData = undefined;
    this.showBlankRow = false;
  }

  cancelAddMaterial() {
    // Reset the newMaterial object and hide the blank row when canceled
    this.newMaterial = {};
    this.showBlankRow = false;
  }

  // Function to retrieve the selected material data from localStorage
  getSelectedMaterialDataFromLocalStorage(): void {
    const selectedMaterialDataString = localStorage.getItem('selectedMaterialData');
    if (selectedMaterialDataString) {
      const selectedMaterialData = JSON.parse(selectedMaterialDataString);
      this.selectedMaterial.push(selectedMaterialData);
    }
  }
}
