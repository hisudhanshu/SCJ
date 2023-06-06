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
  successMessage: string = ''; // Success message variable

  newProduct: any = {
    name: '',
    category: '',
    brand: '',
    customer: '',
    recipe: '',
    clientType: ''
  };

  isEditMode: boolean = false; // Add a flag for edit mode
  editIndex: number = -1; // Index of the product being edited

  constructor(private authService: AuthServicesService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  createOrUpdateProduct() {
    if (this.isEditMode) {
      // Update existing product
      this.products[this.editIndex] = { ...this.newProduct };
      this.saveProducts();
      this.isEditMode = false; // Reset edit mode
      this.editIndex = -1; // Reset edit index
    } else {
      // Create new product
      this.authService.insertProductData(this.newProduct)
        .subscribe(
          (response) => {
            console.log('Product data inserted successfully:', response);
            this.products.push({ ...this.newProduct });
            this.saveProducts();
            this.resetForm(); // Reset the form after creating a new product
            this.successMessage = 'Product added successfully.'; // Set the success message
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
      clientType: ''
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
}
