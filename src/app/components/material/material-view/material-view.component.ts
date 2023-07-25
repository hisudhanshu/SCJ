import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/Service/auth-services.service';

@Component({
  selector: 'app-material-view',
  templateUrl: './material-view.component.html',
  styleUrls: ['./material-view.component.css']
})
export class MaterialViewComponent implements OnInit {
  materials: any[] | undefined;
  filteredMaterials: any[] | undefined;
  searchQuery: string = '';
  sortDirection: number[] = [1, 1, 1, 1, 1, 1, 1]; // Sort direction for each column
  sortColumn: string = ''; // Currently sorted column
  selectedMaterial: any;

  constructor(private authService: AuthServicesService) { }

  ngOnInit() {
    this.getMaterials();
  }

  getMaterials() {
    this.authService.getMaterials().subscribe(
      (response: any) => {
        if (response.isSuccess && response.matdata !== null) {
          this.materials = response.matdata;
          this.filteredMaterials = response.matdata; // Initialize filteredMaterials with all materials
        } else {
          console.log('API request failed or no data received');
        }
      },
      (error: any) => {
        console.log('Error fetching materials:', error);
      }
    );
  }

  searchMaterials() {
    if (!this.searchQuery) {
      // If searchQuery is empty, reset filteredMaterials to show all materials
      this.filteredMaterials = this.materials;
    } else {
      // Perform the search operation on materials based on the search query
      this.filteredMaterials = this.materials?.filter(material =>
        material?.name?.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  sortTable(column: string) {
    if (this.sortColumn === column) {
      // Reverse the sort direction if the same column is clicked again
      this.sortDirection[this.getHeaderIndex(column)] *= -1;
    } else {
      // Reset the sort direction and set the new sorted column
      this.sortDirection = [1, 1, 1, 1, 1, 1, 1];
      this.sortColumn = column;
    }

    this.filteredMaterials?.sort((a, b) => {
      const index = this.getHeaderIndex(column);
      const direction = this.sortDirection[index];

      if (a && b && a[column] < b[column]) {
        return -1 * direction;
      } else if (a && b && a[column] > b[column]) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
  }

  getHeaderIndex(column: string): number {
    const headers = ['id', 'name', 'm_code', 'm_type', 'm_cost', 'm_Vendor', 'm_inventory'];
    return headers.indexOf(column);
  }
  editMaterial(material: any) {
    material.isEditing = true;
  }

  updateMaterial(material: any) {
    // Perform the update operation for the material, e.g., make an API call

    // After updating, set the isEditing flag to false
    material.isEditing = false;
  }

  deleteMaterial(material: any) {
    // Find the index of the material in the filteredMaterials array
    const index = this.filteredMaterials?.indexOf(material);
    
    if (index !== undefined && index !== -1) {
      // Remove the material from the filteredMaterials array
      this.filteredMaterials?.splice(index, 1);
      
      // Optionally, you can perform additional logic such as sending an HTTP request to delete the material from the server
      
      console.log('Deleted material:', material);
    } else {
      console.log('Material not found:', material);
    }
  }
  formatDate(dateStr: string): string {
    // You can use any date formatting library like date-fns or moment.js,
    // or use the built-in JavaScript Date object to format the date string.
    // For simplicity, here's an example using the Date object:
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
