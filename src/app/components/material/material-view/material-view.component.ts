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

      if (a[column] < b[column]) {
        return -1 * direction;
      } else if (a[column] > b[column]) {
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
}
