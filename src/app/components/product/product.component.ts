import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { ProductService } from 'src/app/productservice.service'; 
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any[] = [];
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
          this.products = data;
        },
        (error: any) => {
          console.log('API Error:', error);
        }
      );
  }}


//   ngOnInit() {
//     this.productService.getProducts().subscribe(
//       (data: any) => {
//         this.products = data;
//         console.log(this.products); // Check if the data is logged correctly
//       },
//       (error: any) => {
//         console.error(error);
//       }
//     );
//   }
// }

//   constructor(private http: HttpClient) { }

//   ngOnInit(): void {
//     this.getProducts();
//   }

//   getProducts(): void {
//     this.http.get<any>('https://localhost:44384/api/Authentication/GetProducts').subscribe(
//       response => {
//         this.products = response; 
//       },
//       error => {
//         console.error('Error occurred while fetching products:', error);
//       }
//     );
//   }
// }