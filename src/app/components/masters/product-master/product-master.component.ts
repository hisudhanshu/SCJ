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

  newProduct: any = {
    name: '',
    category: '',
    brand: '',
    customer: '',
    recipe: '',
    pricing: ''
  };

  constructor(private authService: AuthServicesService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  createProduct() {
    this.products.push({ ...this.newProduct });
    this.saveProducts();
    this.authService.insertProductData(this.newProduct)
      .subscribe(
        (response) => {
          console.log('Product data inserted successfully:', response);
        },
        (error) => {
          console.error('Error occurred while inserting product data:', error);
        }
      );
    this.newProduct = {
      name: '',
      category: '',
      brand: '',
      customer: '',
      recipe: '',
      pricing: ''
    };
  }
  removeProduct(index: number) {
    this.products.splice(index, 1);
    this.saveProducts();
  }

  editProduct(index: number) {
    const product = this.products[index];
    this.newProduct = { ...product };
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
