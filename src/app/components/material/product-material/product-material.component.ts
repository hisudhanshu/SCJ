import { Component, OnInit } from '@angular/core';

interface Product {
  id: number;
  name: string;
}

interface Material {
  name: string;
  description: string;
}

@Component({
  selector: 'app-product-material',
  templateUrl: './product-material.component.html',
  styleUrls: ['./product-material.component.css']
})
export class ProductMaterialComponent implements OnInit {
  products: Product[] = [
    { id: 1, name: 'Bottle' },
    { id: 2, name: 'Polythene' },
    { id: 3, name: 'Polymer' }
  ];

  selectedProduct: number | undefined;
  selectedProductMaterials: Material[] = [];

  ngOnInit(): void {
    // Set the default option as selected
    this.selectedProduct = undefined;
  }

  onProductChange() {
    // Here, you can make an API call or retrieve the related materials
    // for the selected product based on its ID. For simplicity, I'm using
    // static data as an example.

    // Assuming you have a list of materials for each product
    const productMaterials: { [key: number]: Material[] } = {
      1: [
        { name: 'Plastic', description: 'This is a Bottle Material' },
        { name: 'Rubber Plastic', description: 'Material description' }
      ],
      2: [
        { name: 'Nylon', description: 'Material description' },
        { name: 'Polythenate', description: 'Material description' }
      ],
      3: [
        { name: 'Polyvinyl chloride (PVC)', description: 'Material description' },
        { name: 'Polystyrene (PS)', description: 'Material description' }
      ]
    };

    if (this.selectedProduct !== undefined) {
      this.selectedProductMaterials = productMaterials[this.selectedProduct] || [];
    } else {
      this.selectedProductMaterials = [];
    }
  }
}
