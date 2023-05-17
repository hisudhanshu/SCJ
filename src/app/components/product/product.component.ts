import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/productservice.service'; 
import { HttpClient } from '@angular/common/http';
import { baseUrl1 } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) { }
  ngOnInit() {
    // Initialize products array
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getProducts().subscribe(
      (data: any) => {
        this.products = data;
        console.log(this.products); // Check if the data is logged correctly
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}

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


  

//   products: any[] = [];

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
// products: any[] | undefined;

//   constructor(private authService: AuthServicesService) {}


  // getProducts(): void {
  //   const requestData = {}; // Add your request data here
  //   this.authService.getProduct(requestData).subscribe(
  //     (response) => {
  //       this.products = response;
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }}