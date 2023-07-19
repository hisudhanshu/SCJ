import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthServicesService } from 'src/app/Service/auth-services.service';
import { Input } from '@angular/core';

@Component({
  selector: 'app-view-fullrecipe',
  templateUrl: './view-fullrecipe.component.html',
  styleUrls: ['./view-fullrecipe.component.css']
})
export class ViewFullrecipeComponent implements OnInit {
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
  productDetails: any;

  isEditingName = false;
  isEditingCategory = false;
  isEditingBrand = false;
  isEditingCustomer = false;
  isEditingClientType = false;
  products: any;

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
    throw new Error('Method not implemented.');

  }
  isEditing = false;

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
}