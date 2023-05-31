import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-material',
  templateUrl: './product-material.component.html',
  styleUrls: ['./product-material.component.css']
})
export class ProductMaterialComponent implements OnInit {
  ngOnInit(): void {
  }

  rawMaterials: string[] = [];
  products: { name: string, recipe: string }[] = [];
  materialName: string = '';
  productName: string = '';
  recipe: string = '';

  addMaterial() {
    if (this.materialName.trim() !== '') {
      this.rawMaterials.push(this.materialName.trim());
      this.materialName = '';
    }
  }

  addProduct() {
    if (this.productName.trim() !== '' && this.recipe.trim() !== '') {
      const product = { name: this.productName.trim(), recipe: this.recipe.trim() };
      this.products.push(product);
      this.productName = '';
      this.recipe = '';
    }
  }
}