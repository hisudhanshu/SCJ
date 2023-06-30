import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/Service/auth-services.service';

interface Material {
  id: number;
  name: string;
  m_code: string;
  m_type: string;
  m_cost: string;
  m_Vendor: string;
  m_inventory: string;
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
  materials: Material[] = [];
  showMaterialDropdowns = false;

  // Existing code...

  selectedMaterialId: number = 0;
  selectedMaterialData: Material | undefined;
  isEditing: boolean = false;

  selectedMaterial: string = '';
  elements: Element[] = [];

  categories: string[] = ['Category A', 'Category B', 'Category C'];
  products: any[] = [];
  successMessage: string = '';

  newProduct: any = {
    name: '',
    category: '',
    brand: '',
    customer: '',
    material: '',
    clientType: '',
    rawMaterial: '',
    mquantity:'',
    mcode: '',
    mtype: '',
    mcost: '',
    mvendor: '',
    minventory: '',
    Ematerial:'',
    Emcode:'',
    Emtype:'',
    // Emquantity:'',
    // Emcost:'',
    Emvendor:'',
    Eminventory:'',
    rawElement: '',
    Emquantity: 0,
    Emcost: 0
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
      this.products[this.editIndex] = { ...this.newProduct };
      this.saveProducts();
      // this.isEditMode = false;
      // this.editIndex = -1;
    } else {
      const confirmCreate = confirm("Are you sure you want to create this product?");
      if (confirmCreate) {
        this.authService.insertProductData(this.newProduct).subscribe(
          (response) => {
            console.log('Product data inserted successfully:', response);
            this.products.push({ ...this.newProduct });
            this.saveProducts();
            this.resetForm();
            this.successMessage = 'Product added successfully.';
            alert('Data saved successfully.');
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

  editProduct(index: number) {
    const product = this.products[index];
    this.newProduct = { ...product };
    this.isEditMode = true;
    this.editIndex = index;
  }

  resetForm() {
    this.newProduct = {
      name: '',
      category: '',
      brand: '',
      customer: '',
      recipe: '',
      clientType: '',
      rawMaterial: '',
      rawElement: ''
    };
  }

  private loadProducts() {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      this.products = JSON.parse(savedProducts);
    }
  }

  private saveProducts() {
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  getItemLabel(item: any): string {
    return this.columnData.map((column) => item[column]).join(' | ');
  }

  onMaterialChange(event: any): void {
    const selectedMaterialId = parseInt(event.target.value, 10);

    if (selectedMaterialId !== 0) {
      this.selectedMaterialId = selectedMaterialId;
      this.selectedMaterialData = this.getMaterialDataById(selectedMaterialId);
    } else {
      this.selectedMaterialId = 0;
      this.selectedMaterialData = undefined;
    }
  }

  getMaterialDataById(id: number): Material | undefined {
    return this.materials.find(material => material.id === id);
  }

  deleteMaterial(material: Material) {
    // Perform the necessary logic to delete the material
    // e.g., call an API or update the data in your service
    console.log('Deleting material:', material);
  }

  toggleEditing() {
    this.isEditing = !this.isEditing;
  }
  addMaterial() {
    this.newProduct.materials.push({
      m_code: '',
      m_type: '',
      m_cost: '',
      m_Vendor: '',
      m_inventory: ''
    });
  }
  onAddButtonClick(): void {
    this.showDropdowns = true;
  }
  calculatePrice() {
    if (this.newProduct.Emquantity) {
      this.newProduct.Emcost = this.newProduct.Emquantity * 10;
    }
  }

}