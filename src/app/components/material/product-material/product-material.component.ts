import { Component, OnInit } from '@angular/core';

interface Product {
  name: string;
  recipe: string;
  isEditing: boolean;
}

@Component({
  selector: 'app-product-material',
  templateUrl: './product-material.component.html',
  styleUrls: ['./product-material.component.css']
})
export class ProductMaterialComponent implements OnInit {
  products: Product[] = [];
  newProduct: Product = { name: '', recipe: '', isEditing: false };

  ngOnInit() {
    // You can add any initial data or API call here
  }

  addProduct() {
    if (this.newProduct.name.trim() !== '' && this.newProduct.recipe.trim() !== '') {
      this.products.push({ ...this.newProduct, isEditing: false });
      this.newProduct = { name: '', recipe: '', isEditing: false };
    }
  }

  deleteProduct(index: number) {
    this.products.splice(index, 1);
  }

  editProduct(index: number) {
    this.products[index].isEditing = true;
  }

  saveProduct(index: number) {
    this.products[index].isEditing = false;
  }

  cancelEdit(index: number) {
    this.products[index].isEditing = false;
  }

  trackByIndex(index: number, item: any) {
    return index;
  }
}
