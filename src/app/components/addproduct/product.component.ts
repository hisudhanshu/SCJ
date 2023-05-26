import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { ProductService } from 'src/app/Service/productservice.service'; 
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any = [];
  successMessage: string = '';

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
  }}