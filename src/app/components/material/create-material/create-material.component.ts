import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/Service/auth-services.service';
import { Modal } from 'bootstrap';

declare const bootstrap: any;

@Component({
  selector: 'app-create-material',
  templateUrl: './create-material.component.html',
  styleUrls: ['./create-material.component.css']
})
export class CreateMaterialComponent implements OnInit {
  successMessage: string = '';
  errorMessage: string = '';
  materials: any[] | undefined;
  filteredMaterials: any[] | undefined;
  searchKeyword: string = '';
  material: any = {
    name: '',
    M_type: '',
    code: null,
    M_cost: null,
    M_Vendor: '',
    M_inventory: ''
  };
  materialsList: any[] = [];
  editIndex: number = -1;
  selectedMaterial: any;

  confirmModalTitle: string = '';
  confirmModalMessage: string = '';

  constructor(private authService: AuthServicesService) { }

  ngOnInit(): void {
    this.getMaterials1();
    const storedMaterials = localStorage.getItem('materials');
    if (storedMaterials) {
      this.materialsList = JSON.parse(storedMaterials);
    }
  }

  getMaterials1() {
    this.authService.getMaterials().subscribe(
      (response: any) => {
        if (response.isSuccess && response.matdata !== null) {
          this.materials = response.matdata;
          this.filteredMaterials = response.matdata;
        } else {
          console.log('API request failed or no data received');
        }
      },
      (error: any) => {
        console.log('Error fetching materials:', error);
      }
    );
  }

  addMaterial(): void {
    this.confirmModalTitle = 'Add Material';
    this.confirmModalMessage = 'Are you sure you want to add this material?';

    // Show the confirmation modal
    const confirmModal = document.getElementById('confirmModal');
    if (confirmModal) {
      const bootstrapModal = new bootstrap.Modal(confirmModal);
      bootstrapModal.show();
    }
  }

  updateMaterial(): void {
    this.confirmModalTitle = 'Update Material';
    this.confirmModalMessage = 'Are you sure you want to update this material?';

    // Show the confirmation modal
    const confirmModal = document.getElementById('confirmModal');
    if (confirmModal) {
      const bootstrapModal = new bootstrap.Modal(confirmModal);
      bootstrapModal.show();
    }
  }

  deleteMaterialConfirmed(): void {
    this.confirmModalTitle = 'Delete Material';
    this.confirmModalMessage = 'Are you sure you want to delete this material?';

    // Show the confirmation modal
    const confirmModal = document.getElementById('confirmModal');
    if (confirmModal) {
      const bootstrapModal = new bootstrap.Modal(confirmModal);
      bootstrapModal.show();
    }
  }

  // This function is called after the user confirms the action in the modal
  performAction(): void {
    if (this.confirmModalTitle === 'Add Material') {
      const confirmAdd = true; // Replace this with the actual API call or logic for adding material
      if (confirmAdd) {
        // API call for adding material
        this.authService.insertData(this.material).subscribe(
          (response: any) => {
            if (response.isSuccess) {
              this.successMessage = 'Material added successfully.';
              this.errorMessage = '';
              this.clearAlertsAfterTimeout();
              this.materialsList.push(this.material);
              this.saveMaterials();
              this.clearForm();
              this.showSuccessModal();
            } else {
              this.errorMessage = 'Error adding material.';
              this.successMessage = '';
              this.clearAlertsAfterTimeout();
              this.showErrorModal();
            }
          },
          (error: any) => {
            this.errorMessage = 'Error adding material.';
            this.successMessage = '';
            console.error('Error adding material.', error);
            this.clearAlertsAfterTimeout();
            this.showErrorModal();
          }
        );
      }
    } else if (this.confirmModalTitle === 'Update Material') {
      const confirmUpdate = true; // Replace this with the actual API call or logic for updating material
      if (confirmUpdate) {
        this.successMessage = 'Material Updated successfully.';
        this.errorMessage = 'Material not Updated';
        // API call for updating material
        const materialToUpdate = this.materialsList[this.editIndex];
        materialToUpdate.name = this.material.name;
        materialToUpdate.M_type = this.material.M_type;
        materialToUpdate.code = this.material.code;
        materialToUpdate.M_cost = this.material.M_cost;
        materialToUpdate.M_Vendor = this.material.M_Vendor;
        materialToUpdate.M_inventory = this.material.M_inventory;
        this.saveMaterials();
        this.clearForm();
        this.editIndex = -1;
        this.showSuccessModal();
      }
    } else if (this.confirmModalTitle === 'Delete Material') {
      // Handle the delete logic here
      const confirmDelete = true; // Replace this with the actual API call or logic for deleting material
      if (confirmDelete) {
        this.successMessage = 'Material Delete successfully.';
        this.errorMessage = '';
        // API call for deleting material
        this.materialsList.splice(this.editIndex, 1);
        this.saveMaterials();
        this.showSuccessModal();
      }
    }
  }

  clearAlertsAfterTimeout(): void {
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 2000);
  }

  saveMaterials(): void {
    localStorage.setItem('materials', JSON.stringify(this.materialsList));
  }

  clearForm(): void {
    this.material = {
      name: '',
      M_type: '',
      code: null,
      M_cost: null,
      M_Vendor: '',
      M_inventory: ''
    };
  }

  editMaterial(index: number): void {
    this.editIndex = index;
    const materialToEdit = this.materialsList[index];
    this.material = { ...materialToEdit };
  }

  filterMaterials(): void {
    if (this.searchKeyword.trim() === '') {
      this.materialsList = JSON.parse(localStorage.getItem('materials') || '[]');
    } else {
      this.materialsList = JSON.parse(localStorage.getItem('materials') || '[]').filter((material: any) =>
        material.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    }
  }

  searchMaterials(): void {
    if (this.searchKeyword.trim() === '') {
      this.materialsList = JSON.parse(localStorage.getItem('materials') || '[]');
    } else {
      this.materialsList = JSON.parse(localStorage.getItem('materials') || '[]').filter((material: any) =>
        material.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    }
  }

  openModal(material: any) {
    this.selectedMaterial = material;
    // Code to open the modal
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

  showSuccessModal(): void {
    const successModal = document.getElementById('successModal');
    if (successModal) {
      const bootstrapModal = new bootstrap.Modal(successModal);
      bootstrapModal.show();
      setTimeout(() => bootstrapModal.hide(), 2000); // Automatically hide after 2 seconds
    }
  }

  showErrorModal(): void {
    const errorModal = document.getElementById('errorModal');
    if (errorModal) {
      const bootstrapModal = new bootstrap.Modal(errorModal);
      bootstrapModal.show();
      setTimeout(() => bootstrapModal.hide(), 2000); // Automatically hide after 2 seconds
    }
  }
}
