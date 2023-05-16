import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/product-service.service';


@Component({
  selector: 'app-pages-product-component',
  templateUrl: './pages-product-component.component.html',
  styleUrls: ['./pages-product-component.component.css']
})

export class PagesProductComponentComponent implements OnInit {
  formGroup!: FormGroup<{ productId: FormControl<string | null>; }>;

  constructor(private router: Router, private productService: ProductService) {}
  initForm() {
    this.formGroup = new FormGroup({
      productId: new FormControl("", [Validators.required])
    });
  }
 
  getProduct() {
    if (this.formGroup.valid) {
      const productId = this.formGroup.value.productId;
  
      if (productId) {
        this.productService.getProduct(productId).subscribe(result => {
          console.log(result);
  
          if (result.success) {
            console.log(result);
            alert(result.message);
          } else {
            alert(result.message);
          }
        });
      } else {
        // Handle case when productId is undefined
        alert('Please enter a valid product ID');
      }
    }
  }
  ngOnInit(): void {
  }

}