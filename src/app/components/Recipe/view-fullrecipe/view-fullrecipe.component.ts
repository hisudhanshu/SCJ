import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/Service/auth-services.service';

@Component({
  selector: 'app-view-fullrecipe',
  templateUrl: './view-fullrecipe.component.html',
  styleUrls: ['./view-fullrecipe.component.css']
})
export class ViewFullrecipeComponent implements OnInit {
  filteredRecipes: any[] = [];
  selectedProductId: number | null = null;
  recipesData: any[] = [];
  selectedRecipe: any;
  searchKeyword: string = '';
  recipes: any;
  isAscending: boolean = true;
  sortColumn: string = '';
  isModalOpen: boolean = false;
  selectedItem: any | null = null; // Update the type to "any"

  constructor(private authService: AuthServicesService) {}

  ngOnInit(): void {
    this.authService.getRecipescompare().subscribe(
      (response: any) => {
        if (response.isSuccess && response.jsonData !== null) {
          this.recipesData = JSON.parse(response.jsonData);
          this.filteredRecipes = this.recipesData; // Initialize filteredRecipes with all recipes
        } else {
          console.log('API request failed or no data received');
        }
      },
      (error: any) => {
        console.log('Error fetching recipes:', error);
      }
    );
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

  updateItem(item: any) {
    // Perform the update logic here
    // For example, you can make an API call to update the item
    // Once the update is successful, reset the selectedItem to null
    this.selectedItem = null;
  }
  editItem(item: any) {
    this.selectedItem = item; // Set the selected item for editing
  }

  deleteItem(item: any) {
    const index = this.filteredRecipes.indexOf(item);
    if (index !== -1) {
      this.filteredRecipes.splice(index, 1); // Remove the item from the array
    }

  }

  search() {
    this.filteredRecipes = this.recipesData.filter((item: { name: string }) =>
      item.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
    );
  }
}
