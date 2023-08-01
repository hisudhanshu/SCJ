import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/Service/auth-services.service';
// import { Modal } from 'bootstrap';
declare const bootstrap: any;

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
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent implements OnInit { 

  successMessage: string = '';
  errorMessage: string = '';
  confirmModalTitle: string = '';
  confirmModalMessage: string = '';

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

  selectedMaterial: any = [];
  elements: Element[] = [];

  categories: string[] = ['Category A', 'Category B', 'Category C'];
  products: any[] = [];

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

  isEditMode: boolean = false;
  editIndex: number = -1;

  rawElements: any[] = [];
  selectedMaterialName: string | undefined;
  columnData: string[] = [];
  filteredData: any[] = [];
  materialDropdownData: string[] = [];
  selectedFilteredItem: any;
  showDropdowns: boolean | undefined;

  constructor(private authService: AuthServicesService) { }

  ngOnInit(): void {
    this.authService.getMaterials().subscribe((response: any) => {
      if (response.isSuccess && response.matdata !== null) {
        this.materials = response.matdata;
      } else {
        console.log('API request failed or no data received');
      }
    });
    this.loadProducts();
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
  }

  createOrUpdateProduct() {
    if (this.isEditMode) {
      // Update the existing product
      this.products[this.editIndex] = { ...this.newProduct };
    } else {
      this.confirmModalTitle = 'Add Product';
      this.confirmModalMessage = 'Are you sure you want to add this product?';
      this.showConfirmationModal(this.confirmModalTitle, this.confirmModalMessage);
    }
  }

  removeProduct(index: number) {
    this.products.splice(index, 1);
    this.saveProducts();
  }

  private loadProducts() {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      this.products = JSON.parse(savedProducts);
    }
  }

  private saveProducts() {
    // localStorage.setItem('products', JSON.stringify(this.products));
  }

  getItemLabel(item: any): string {
    return this.columnData.map((column) => item[column]).join(' | ');
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

  // Edit function
  editMaterial(material: any) {
    material.isEditing = true; // Set 'isEditing' property to true for the selected recipe
  }

  // Component logic
  deleteMaterial(material: any) {
    // Find the index of the material in the selectedMaterial array
    const index = this.selectedMaterial.indexOf(material);

    if (index !== -1) {
      // Remove the material from the selectedMaterial array
      this.selectedMaterial.splice(index, 1);

      // Optionally, you can perform additional logic such as sending an HTTP request to delete the material from the server

      console.log('Deleted material:', material);
    }
  }

  saveMaterial(material: any): void {
    // Implement your logic for saving the edited recipe
    console.log('Save Material:', material);
  }

  // Method to show the success modal
  showSuccessModal(message: string): void {
    this.successMessage = message;
    const successModal = document.getElementById('successModal');
    if (successModal) {
      const bootstrapModal = new bootstrap.Modal(successModal);
      bootstrapModal.show();
      setTimeout(() => bootstrapModal.hide(), 2000); // Automatically hide after 2 seconds
    }
  }

  // Method to show the error modal
  showErrorModal(message: string): void {
    this.errorMessage = message;
    const errorModal = document.getElementById('errorModal');
    if (errorModal) {
      const bootstrapModal = new bootstrap.Modal(errorModal);
      bootstrapModal.show();
      setTimeout(() => bootstrapModal.hide(), 2000); // Automatically hide after 2 seconds
    }
  }

  // Method to show the confirmation modal
  showConfirmationModal(title: string, message: string): void {
    this.confirmModalTitle = title;
    this.confirmModalMessage = message;
    const confirmModal = document.getElementById('confirmModal');
    if (confirmModal) {
      const bootstrapModal = new bootstrap.Modal(confirmModal);
      bootstrapModal.show();
    }
  }

  // Method to perform the action after confirming in the modal
  performAction(): void {
    if (this.confirmModalTitle === 'Add Material') {
      // Logic for adding material...
      // For example:
      // this.addMaterial();
      this.showSuccessModal('Material added successfully.');
    } else if (this.confirmModalTitle === 'Update Material') {
      // Logic for updating material...
      // For example:
      // this.updateMaterial();
      this.showSuccessModal('Material updated successfully.');
    } else if (this.confirmModalTitle === 'Delete Material') {
      // Logic for deleting material...
      // For example:
      // this.deleteMaterial();
      this.showSuccessModal('Material deleted successfully.');
    } else if (this.confirmModalTitle === 'Add Product') {
      // Logic for adding product...
      // For example:
      this.authService.insertProductData(this.newProduct).subscribe(
        (response: any) => {
          if (response.isSuccess) {
            console.log('Product data inserted successfully:', response);
            this.products.push({ ...this.newProduct });
            this.saveProducts();

            this.showSuccessModal('Product added successfully.');
          } else {
            console.error('Failed to insert product data:', response);
            this.showErrorModal('Failed to add the Product.');
          }
        },
        (error: any) => {
          console.error('Error occurred while inserting product data:', error);
          this.showErrorModal('Failed to add the recipe.');
        }
      );
    }
  }

  // Functions to handle different actions in your component
  addMaterial(): void {
    this.confirmModalTitle = 'Add Product';
    this.confirmModalMessage = 'Are you sure you want to add this recipe?';
    this.showConfirmationModal(this.confirmModalTitle, this.confirmModalMessage);
  }

  updateMaterial(material: any): void {
    this.confirmModalTitle = 'Update Recipe';
    this.confirmModalMessage = 'Are you sure you want to update this recipe?';
    this.showConfirmationModal(this.confirmModalTitle, this.confirmModalMessage);
  }

  deleteMaterialConfirmed(): void {
    this.confirmModalTitle = 'Delete Recipe';
    this.confirmModalMessage = 'Are you sure you want to delete this recipe?';
    this.showConfirmationModal(this.confirmModalTitle, this.confirmModalMessage);
  }
}
