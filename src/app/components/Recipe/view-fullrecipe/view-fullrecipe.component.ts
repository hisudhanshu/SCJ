import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthServicesService } from 'src/app/Service/auth-services.service';

@Component({
  selector: 'app-view-fullrecipe',
  templateUrl: './view-fullrecipe.component.html',
  styleUrls: ['./view-fullrecipe.component.css']
})
export class ViewFullrecipeComponent implements OnInit {
  selectedProductId: number | null = null;
  recipesData: any[] = [];
  selectedRecipe: any;
  filteredRecipes: any[] = [];
  searchKeyword: string = '';
  recipes: any;
  isAscending: boolean = true;
  sortColumn: string = '';
  isModalOpen: boolean = false;
  // productId: any;
  productId!: string;
  productDetails: any;

  constructor(private authService: AuthServicesService, private activatedRoute: ActivatedRoute) { }



  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.productId = res['id'];
      console.log(res)
    })
    this.authService.getRecipes().subscribe(
      (response: any) => {
        if (response.isSuccess && response.jsonData !== null) {
          this.recipesData = JSON.parse(response.jsonData);
          console.log(this.recipesData)
          this.productDetails = this.recipesData.filter((item) => {
            if (item.P_Id == this.productId) {
              return item;
            }
          })
          console.log(this.productDetails)
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

  getSelectedProductMaterials(): any[] {
    if (this.productId === null) {
      return [];
    }

    return this.recipesData.filter(recipe => recipe.P_Id === this.productId);
  }

  showDetails(recipeData: any) {
    this.selectedRecipe = recipeData;
    this.productId = recipeData.Id;
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

  deleteMaterial(material: any) {
    const index = this.getSelectedProductMaterials().indexOf(material);
    if (index !== -1) {
      this.getSelectedProductMaterials().splice(index, 1);
      const originalIndex = this.recipesData.findIndex((r: any) => r.Id === material.Id);
      if (originalIndex !== -1) {
        this.recipesData.splice(originalIndex, 1);
      }
    }
  }
  getProductDetails(id: string) {
    this.authService.getRecipes().subscribe(res => {
      let data = res;
      this.productDetails = data.filter((item) => {
        if (item.Id == id) {
          return item;
        }
      })

      console.log(res)
      console.log(this.productDetails);

    })
  }
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
  editRecipe(recipe: any) {
    recipe.isEditing = true;
  }

  updateRecipe(recipe: any) {
    // Implement the logic to update the recipe
    recipe.isEditing = false;
  }

  deleteRecipe(recipe: any) {
    const index = this.filteredRecipes.indexOf(recipe);
    if (index !== -1) {
      this.filteredRecipes.splice(index, 1);

      const originalIndex = this.recipesData.findIndex((r: any) => r.Id === recipe.Id);
      if (originalIndex !== -1) {
        this.recipesData.splice(originalIndex, 1);
      }

      if (this.selectedRecipe && this.selectedRecipe.Id === recipe.Id) {
        this.selectedRecipe = null;
        this.selectedProductId = null;
      }
    }
  }
  // Function to retrieve the product by ID
  getProductById(productId: number): any {
    return this.filteredRecipes.find((recipe: any) => recipe.Id === productId);
  }
}
