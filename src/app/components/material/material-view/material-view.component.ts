// Without Modal Code :


// import { Component, OnInit } from '@angular/core';
// import { AuthServicesService } from 'src/app/Service/auth-services.service';

// @Component({
//   selector: 'app-material-view',
//   templateUrl: './material-view.component.html',
//   styleUrls: ['./material-view.component.css']
// })
// export class MaterialViewComponent implements OnInit {
//   materials: any[] | undefined;
//   filteredMaterials: any[] | undefined;
//   searchQuery: string = '';
//   sortDirection: number[] = [1, 1, 1, 1, 1, 1, 1]; // Sort direction for each column
//   sortColumn: string = ''; // Currently sorted column
//   selectedMaterial: any;

//   constructor(private authService: AuthServicesService) { }

//   ngOnInit() {
//     this.getMaterials();
//   }
// // Date API Start here *********************************************************************************************************
//   // getMaterials() {
//   //   this.authService.getMaterials().subscribe(
//   //     (response: any) => {
//   //       if (response.isSuccess && response.matdata !== null) {
//   //         this.materials = response.matdata;
//   //         this.filteredMaterials = response.matdata; // Initialize filteredMaterials with all materials
//   //       } else {
//   //         console.log('API request failed or no data received');
//   //       }
//   //     },
//   //     (error: any) => {
//   //       console.log('Error fetching materials:', error);
//   //     }
//   //   );
//   // }
// // End here ***********************************************************************************************************************
  
// // LocalStorage Date Start here ***************************************************************************************************


// getMaterials() {
//   this.authService.getMaterials().subscribe(
//     (response: any) => {
//       if (response.isSuccess && response.matdata !== null) {
//         this.materials = response.matdata.map((material: any) => {
//           // Add a 'created_date' property with the current date to each material
//           return { ...material, created_date: new Date().toISOString() };
//         });
//         this.filteredMaterials = this.materials; // Initialize filteredMaterials with all materials
//       } else {
//         console.log('API request failed or no data received');
//       }
//     },
//     (error: any) => {
//       console.log('Error fetching materials:', error);
//     }
//   );
// }

// // End here

// searchMaterials() {
//     if (!this.searchQuery) {
//       // If searchQuery is empty, reset filteredMaterials to show all materials
//       this.filteredMaterials = this.materials;
//     } else {
//       // Perform the search operation on materials based on the search query
//       this.filteredMaterials = this.materials?.filter(material =>
//         material?.name?.toLowerCase().includes(this.searchQuery.toLowerCase())
//       );
//     }
//   }

//   sortTable(column: string) {
//     if (this.sortColumn === column) {
//       // Reverse the sort direction if the same column is clicked again
//       this.sortDirection[this.getHeaderIndex(column)] *= -1;
//     } else {
//       // Reset the sort direction and set the new sorted column
//       this.sortDirection = [1, 1, 1, 1, 1, 1, 1];
//       this.sortColumn = column;
//     }

//     this.filteredMaterials?.sort((a, b) => {
//       const index = this.getHeaderIndex(column);
//       const direction = this.sortDirection[index];

//       if (a && b && a[column] < b[column]) {
//         return -1 * direction;
//       } else if (a && b && a[column] > b[column]) {
//         return 1 * direction;
//       } else {
//         return 0;
//       }
//     });
//   }

//   getHeaderIndex(column: string): number {
//     const headers = ['id', 'name', 'm_code', 'm_type', 'm_cost', 'm_Vendor', 'm_inventory'];
//     return headers.indexOf(column);
//   }
//   editMaterial(material: any) {
//     material.isEditing = true;
//   }

// // Date with API Start Change here 2  *******************************************************************************************


//   // updateMaterial(material: any) {
//   //   // Perform the update operation for the material, e.g., make an API call

//   //   // After updating, set the isEditing flag to false
//   //   material.isEditing = false;
//   // }

//   //  End here ********************************************************************************************************************
  
//   // Local Storage Date Start here ***********************************************************************************************
  

//   updateMaterial(material: any) {
//     // Perform the update operation for the material, e.g., make an API call

//     if (material.id === undefined) {
//       // If 'id' is undefined, it means it's a new material, so add the current date
//       material.created_date = new Date().toISOString();
//     }

//     // After updating, set the isEditing flag to false
//     material.isEditing = false;
//   }


// // End here 

//   deleteMaterial(material: any) {
//     // Find the index of the material in the filteredMaterials array
//     const index = this.filteredMaterials?.indexOf(material);
    
//     if (index !== undefined && index !== -1) {
//       // Remove the material from the filteredMaterials array
//       this.filteredMaterials?.splice(index, 1);
      
//       // Optionally, you can perform additional logic such as sending an HTTP request to delete the material from the server
      
//       console.log('Deleted material:', material);
//     } else {
//       console.log('Material not found:', material);
//     }
//   }
//   formatDate(dateStr: string): string {
//     // You can use any date formatting library like date-fns or moment.js,
//     // or use the built-in JavaScript Date object to format the date string.
//     // For simplicity, here's an example using the Date object:
//     const date = new Date(dateStr);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//     });
//   }
// }


// With Modal Code :

import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/Service/auth-services.service';
import { Modal } from 'bootstrap';

declare const bootstrap: any;

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
  successMessage: string = '';
  errorMessage: string = '';
  confirmModalTitle: string = ''; // New property for the confirmation modal title
  confirmModalMessage: string = ''; // New property for the confirmation modal message

  constructor(private authService: AuthServicesService) { }

  ngOnInit() {
    this.getMaterials();
  }

  // Function to fetch materials from the API
  getMaterials() {
    this.authService.getMaterials().subscribe(
      (response: any) => {
        if (response.isSuccess && response.matdata !== null) {
          this.materials = response.matdata.map((material: any) => {
            // Add a 'created_date' property with the current date to each material
            return { ...material, created_date: new Date().toISOString() };
          });
          this.filteredMaterials = this.materials; // Initialize filteredMaterials with all materials
        } else {
          console.log('API request failed or no data received');
        }
      },
      (error: any) => {
        console.log('Error fetching materials:', error);
      }
    );
  }

  // Function to perform search based on the user's query
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

  // Function to handle sorting of table columns
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

  // Function to get the index of the table column header
  getHeaderIndex(column: string): number {
    const headers = ['id', 'name', 'm_code', 'm_type', 'm_cost', 'm_Vendor', 'm_inventory'];
    return headers.indexOf(column);
  }

  // Function to enable edit mode for a material row
  editMaterial(material: any) {
    material.isEditing = true;
  }
  // Function to handle the delete operation for a material
  deleteMaterial(material: any) {
    // Store the selected material before showing the confirmation modal
    this.selectedMaterial = material;
    this.confirmModalTitle = 'Confirm Deletion'; // Set the title for the confirmation modal
    this.confirmModalMessage = `Are you sure you want to delete ${material.name}?`; // Set the message for the confirmation modal

    // Open the confirmation modal
    const confirmModal = document.getElementById('confirmModal');
    if (confirmModal) {
      const bootstrapModal = new bootstrap.Modal(confirmModal);
      bootstrapModal.show();
    }
  }

  // Function to perform the action (delete) after user confirms in the modal
  performAction() {
    if (this.selectedMaterial) {
      // Perform the delete operation for the material, e.g., make an API call

      // Remove the material from the filteredMaterials array
      const index = this.filteredMaterials?.indexOf(this.selectedMaterial);
      if (index !== undefined && index !== -1) {
        this.filteredMaterials?.splice(index, 1);
      }

      // Optionally, you can perform additional logic such as sending an HTTP request to delete the material from the server

      // Show success message modal
      this.successMessage = 'Material deleted successfully!';
      const successModal = document.getElementById('successModal');
      if (successModal) {
        const bootstrapModal = new bootstrap.Modal(successModal);
        bootstrapModal.show();

        // Hide success message modal after 2 seconds
        setTimeout(() => {
          bootstrapModal.hide();
        }, 2000);
      }
    } else {
      // Show error message modal
      this.errorMessage = 'Error deleting material.';
      const errorModal = document.getElementById('errorModal');
      if (errorModal) {
        const bootstrapModal = new bootstrap.Modal(errorModal);
        bootstrapModal.show();

        // Hide error message modal after 2 seconds
        setTimeout(() => {
          bootstrapModal.hide();
        }, 2000);
      }
    }

    // Close the confirmation modal after the action is performed
    const confirmModal = document.getElementById('confirmModal');
    if (confirmModal) {
      const bootstrapModal = new bootstrap.Modal(confirmModal);
      bootstrapModal.hide();
    }
  }
  // Function to perform update operation on a material
  updateMaterial(material: any) {
    // Close the confirmation modal
    const confirmModal = document.getElementById('confirmModal');
    if (confirmModal) {
      const bootstrapModal = new bootstrap.Modal(confirmModal);
      bootstrapModal.hide();
    }

    // Perform the update operation for the material, e.g., make an API call

    if (material.id === undefined) {
      // If 'id' is undefined, it means it's a new material, so add the current date
      material.created_date = new Date().toISOString();
    }

    // After updating, set the isEditing flag to false
    material.isEditing = false;

    // Show the success message modal for update
    this.successMessage = 'Material updated successfully!';
    const updateSuccessModal = document.getElementById('updateSuccessModal');
    if (updateSuccessModal) {
      const bootstrapModal = new bootstrap.Modal(updateSuccessModal);
      bootstrapModal.show();

      // Hide the success message modal after 2 seconds
      setTimeout(() => {
        bootstrapModal.hide();
      }, 2000);
    }
  }


  // Function to format the date in a user-friendly way
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

