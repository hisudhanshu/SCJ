import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Service/productservice.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any = [];
  selectedProduct: string = '';
  selectedQuantity: number = 0;
  selectedPrice: number = 0;
  selectedInStock: boolean = false;
  savedDataList: any[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    // Initialize products array
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getProducts()
      .pipe(
        tap((data: any) => {
          console.log('API Response:', data);
        })
      )
      .subscribe(
        (data: any) => {
          this.products = data.product;
        },
        (error: any) => {
          console.log('API Error:', error);
        }
      );
  }

  saveData() {
    if (this.selectedProduct && this.selectedQuantity && this.selectedPrice && this.selectedInStock) {
      const savedData = {
        name: this.selectedProduct,
        quantity: this.selectedQuantity,
        price: this.selectedPrice,
        inStock: this.selectedInStock
      };

      this.savedDataList.push(savedData);
      this.resetForm();
    } else {
      // Handle validation error or show error message
    }
  }

  resetForm() {
    this.selectedProduct = '';
    this.selectedQuantity = 0;
    this.selectedPrice = 0;
    this.selectedInStock = false;
  }
}
