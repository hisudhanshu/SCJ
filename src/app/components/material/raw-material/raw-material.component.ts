import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-raw-material',
  templateUrl: './raw-material.component.html',
  styleUrls: ['./raw-material.component.css']
})
export class RawMaterialComponent implements OnInit {
  materials: Material[] = [
    { name: 'Material 1', supplier: 'Supplier A', quantity: 100 },
    { name: 'Material 2', supplier: 'Supplier B', quantity: 200 },
    { name: 'Material 3', supplier: 'Supplier C', quantity: 150 },
    // Add more initial materials here
  ];

  newMaterial: Material = {
    name: '',
    supplier: '',
    quantity: 0
  };

  ngOnInit(): void {
    // Initialize any necessary data or perform operations on component initialization
  }

  addMaterial() {
    if (this.newMaterial.name.trim() !== '' && this.newMaterial.supplier.trim() !== '') {
      this.materials.push(this.newMaterial);
      this.newMaterial = {
        name: '',
        supplier: '',
        quantity: 0
      };
    }
  }

  updateMaterial(index: number) {
    const material = this.materials[index];
    if (material.name.trim() !== '' && material.supplier.trim() !== '') {
      // Perform any additional validations or updates here
    }
  }

  removeMaterial(index: number) {
    this.materials.splice(index, 1);
  }
}

interface Material {
  name: string;
  supplier: string;
  quantity: number;
}
