import { Component } from '@angular/core';

@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.css']
})
export class ProductMasterComponent {
  products: any[] = [
    {
      productID: '001',
      productName: 'Product A',
      productCategory: 'Category 1',
      brand: 'Brand X',
      customerName: 'Customer 1',
      associatedRecipe: 'Recipe A',
      pricing: 'B2B: $10, B2C: $15, Direct: $12'
    },
    {
      productID: '002',
      productName: 'Product B',
      productCategory: 'Category 2',
      brand: 'Brand Y',
      customerName: 'Customer 2',
      associatedRecipe: 'Recipe B',
      pricing: 'B2B: $8, B2C: $12, Direct: $10'
    }
    // Add more objects for additional products
  ];

  newProduct: any = {};
  isProductAdded: boolean = false;

  addProduct() {
    const existingProduct = this.products.find(product => product.productID === this.newProduct.productID);
    if (existingProduct) {
      this.isProductAdded = false;
    } else {
      this.products.push(this.newProduct);
      this.newProduct = {};
      this.isProductAdded = true;
    }
  }

  deleteProduct(product: any) {
    const index = this.products.indexOf(product);
    if (index !== -1) {
      this.products.splice(index, 1);
    }
  }

  editProduct(product: any) {
    // Implement the logic to handle editing a product
    // You can open a modal or navigate to a different page/component for editing
    // Pass the `product` object to the edit form/component to prefill the fields
  }
}
