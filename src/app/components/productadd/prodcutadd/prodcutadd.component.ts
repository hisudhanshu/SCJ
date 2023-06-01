import { Component, OnInit } from '@angular/core';

interface RawMaterial {
  name: string;
  editMode: boolean;
}

@Component({
  selector: 'app-prodcutadd',
  templateUrl: './prodcutadd.component.html',
  styleUrls: ['./prodcutadd.component.css']
})
export class ProdcutaddComponent implements OnInit {
  materials: RawMaterial[] = [];
  filteredMaterials: RawMaterial[] = [];
  newMaterialName: string = '';
  searchKeyword: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  ngOnInit() {
    this.loadMaterialsFromLocalStorage();
    this.filterMaterials();
  }

  addMaterial() {
    if (this.newMaterialName.trim() !== '') {
      const existingMaterial = this.materials.find(material => material.name.toLowerCase() === this.newMaterialName.toLowerCase());
      if (existingMaterial) {
        this.errorMessage = 'Material already exists!';
      } else {
        this.materials.push({ name: this.newMaterialName, editMode: false });
        this.newMaterialName = '';
        this.filterMaterials();
        this.successMessage = 'Material added successfully!';
        this.saveMaterialsToLocalStorage();
      }
      setTimeout(() => {
        this.successMessage = '';
        this.errorMessage = '';
      }, 2000);
    }
  }

  toggleEditMode(material: RawMaterial) {
    material.editMode = !material.editMode;
    this.saveMaterialsToLocalStorage();
  }

  updateMaterial(material: RawMaterial) {
    material.editMode = false;
    this.saveMaterialsToLocalStorage();
  }

  removeMaterial(material: RawMaterial) {
    const confirmDelete = confirm(`Are you sure you want to remove "${material.name}"?`);
    if (confirmDelete) {
      const index = this.materials.indexOf(material);
      if (index !== -1) {
        this.materials.splice(index, 1);
        this.filterMaterials();
        this.successMessage = 'Material removed successfully!';
        setTimeout(() => {
          this.successMessage = '';
        }, 2000);
        this.saveMaterialsToLocalStorage();
      }
    }
  }

  searchMaterials() {
    this.filterMaterials();
  }

  private filterMaterials() {
    this.filteredMaterials = this.materials.filter(material => {
      return material.name.toLowerCase().includes(this.searchKeyword.toLowerCase());
    });
  }

  private saveMaterialsToLocalStorage() {
    localStorage.setItem('materials', JSON.stringify(this.materials));
  }

  private loadMaterialsFromLocalStorage() {
    const savedMaterials = localStorage.getItem('materials');
    if (savedMaterials) {
      this.materials = JSON.parse(savedMaterials);
    }
  }
}
