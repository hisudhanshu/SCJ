import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/Service/auth-services.service';

@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.css']
})
export class ProductMasterComponent implements OnInit {
  categories: string[] = ['Category A', 'Category B', 'Category C'];
  products: any[] = [];
  successMessage: string = '';

  newProduct: any = {
    name: '',
    category: '',
    brand: '',
    customer: '',
    recipe: '',
    clientType: '',
    rawMaterial: '',
    rawElement: ''
  };

  isEditMode: boolean = false;
  editIndex: number = -1;

  rawElements: any[] = [];
  selectedMaterialName: string | undefined;
  columnData: string[] = [];
  filteredData: any[] = [];
  materialDropdownData: string[] = [];
  selectedFilteredItem: any;

  constructor(private authService: AuthServicesService) {}

  ngOnInit(): void {
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
      this.isEditMode = false;
      this.editIndex = -1;
    } else {
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

  onNameSelected(name: string) {
    this.selectedMaterialName = name;
    const selectedItem = this.rawElements.find((item: any) => item.name === name);
    if (selectedItem) {
      this.filteredData = [selectedItem];
      this.materialDropdownData = Object.values(selectedItem)
        .slice(2)
        .filter((value: any, index: number) => typeof value === 'string' && value !== '' && index > 15) as string[];
    } else {
      this.filteredData = [];
      this.materialDropdownData = [];
    }
    this.selectedFilteredItem = undefined;
  }

  getItemLabel(item: any): string {
    return this.columnData.map((column) => item[column]).join(' | ');
  }
}
