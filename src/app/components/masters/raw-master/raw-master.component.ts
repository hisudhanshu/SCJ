import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-raw-master',
  templateUrl: './raw-master.component.html',
  styleUrls: ['./raw-master.component.css']
})
export class RawMasterComponent implements OnInit {
  ngOnInit(): void {
    
  }

  rawMaterials: any[] = [
    {
      materialId: 'RM001',
      materialName: 'Ploy',
      materialType: 'Type A',
      currentCost: 10.50,
      vendorInfo: 'Vendor A',
      inventoryLevel: 100
    },
    // Add more raw materials as needed
  ];

  newMaterial: any = {};
  editingMaterial: any = {};

  createRawMaterial() {
    this.rawMaterials.push(this.newMaterial);
    this.newMaterial = {};
  }

  editRawMaterial(material: any) {
    this.editingMaterial = { ...material };
  }

  updateRawMaterial() {
    // Logic for updating the raw material
    // You can access the edited material details from 'this.editingMaterial' object
    this.editingMaterial = {};
  }

  cancelEdit() {
    this.editingMaterial = {};
  }

  deleteRawMaterial(material: any) {
    const index = this.rawMaterials.indexOf(material);
    if (index !== -1) {
      this.rawMaterials.splice(index, 1);
    }
  }
}