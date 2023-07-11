import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/Service/auth-services.service';

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
  successMessage: string = '';

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
      const confirmCreate = confirm("Are you sure you want to create this product?");
      if (confirmCreate) {
        this.authService.insertProductData(this.newProduct).subscribe(
          (response) => {
            console.log('Product data inserted successfully:', response);
            this.products.push({ ...this.newProduct });
            this.saveProducts();

            this.successMessage = 'Product added successfully.';
            alert('Product added successfully.');
          },
          (error) => {
            console.error('Error occurred while inserting product data:', error);
          }
        );
      }
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
  // Edit function
  editMaterial(material: any) {
    material.isEditing = true; // Set 'isEditing' property to true for the selected recipe
  }

  updateMaterial(material: any): void {
    // Implement your logic for updating a recipe
    console.log('Update material:', material);
    material.isEditing = false; // Set 'isEditing' property back to false after updating
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
}