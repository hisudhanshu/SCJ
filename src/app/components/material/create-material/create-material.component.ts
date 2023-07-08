import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/Service/auth-services.service';

@Component({
  selector: 'app-create-material',
  templateUrl: './create-material.component.html',
  styleUrls: ['./create-material.component.css']
})
export class CreateMaterialComponent implements OnInit {
  materials: any[] | undefined;
  filteredMaterials: any[] | undefined;
  searchKeyword: string = '';
  material: any = {
    name: '',
    M_type: '',
    code: null,
    M_cost: null,
    M_Vendor: '',
    M_inventory: ''
  };
  materialsList: any[] = []; // Array to store the added materials
  editIndex: number = -1; // Index of the material being edited (-1 for none)

  constructor(private authService: AuthServicesService) {}

  ngOnInit(): void {
    this.getMaterials1();
    // Retrieve materials from local storage if available
    const storedMaterials = localStorage.getItem('materials');
    if (storedMaterials) {
      this.materialsList = JSON.parse(storedMaterials);
    }
  }
    getMaterials1() {
      this.authService.getMaterials().subscribe(
        (response: any) => {
          if (response.isSuccess && response.matdata !== null) {
            this.materials = response.matdata;
            this.filteredMaterials = response.matdata; // Initialize filteredMaterials with all materials
          } else {
            console.log('API request failed or no data received');
          }
        },
        (error: any) => {
          console.log('Error fetching materials:', error);
        }
      );
    }


  addMaterial(): void {
    const confirmAdd = confirm('Are you sure you want to add this material?');
    if (confirmAdd) {
      this.authService.insertData(this.material).subscribe(
        (response: any) => {
          console.log('Material added successfully.', response);
          alert('Material added successfully.');
          this.materialsList.push(this.material); // Add material to the list
          this.saveMaterials(); // Save materials to local storage
          this.clearForm(); // Clear the form fields
        },
        (error: any) => {
          console.error('Error adding material.', error);
        }
      );
    }
  }

  saveMaterials(): void {
    localStorage.setItem('materials', JSON.stringify(this.materialsList));
  }

  clearForm(): void {
    this.material = {
      name: '',
      M_type: '',
      code: null,
      M_cost: null,
      M_Vendor: '',
      M_inventory: ''
    };
  }

  editMaterial(index: number): void {
    this.editIndex = index;
    const materialToEdit = this.materialsList[index];
    // Assign the values of the material to the form fields for editing
    this.material = { ...materialToEdit };
  }

  updateMaterial(): void {
    const confirmUpdate = confirm('Are you sure you want to update this material?');
    if (confirmUpdate) {
      const materialToUpdate = this.materialsList[this.editIndex];
      materialToUpdate.name = this.material.name;
      materialToUpdate.M_type = this.material.M_type;
      materialToUpdate.code = this.material.code;
      materialToUpdate.M_cost = this.material.M_cost;
      materialToUpdate.M_Vendor = this.material.M_Vendor;
      materialToUpdate.M_inventory = this.material.M_inventory;
      this.saveMaterials(); // Save updated materials to local storage
      this.clearForm(); // Clear the form fields
      this.editIndex = -1; // Reset the edit index
    }
  }

  deleteMaterial(index: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this material?');
    if (confirmDelete) {
      this.materialsList.splice(index, 1);
      this.saveMaterials(); // Save updated materials to local storage
    }
  }

  filterMaterials(): void {
    if (this.searchKeyword.trim() === '') {
      // Reset the materials list to show all materials when search keyword is empty
      this.materialsList = JSON.parse(localStorage.getItem('materials') || '[]');
    } else {
      // Filter the materials list based on the search keyword
      this.materialsList = JSON.parse(localStorage.getItem('materials') || '[]').filter((material: any) =>
        material.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    }
  }

  searchMaterials(): void {
    if (this.searchKeyword.trim() === '') {
      // Reset the materials list to show all materials when search keyword is empty
      this.materialsList = JSON.parse(localStorage.getItem('materials') || '[]');
    } else {
      // Filter the materials list based on the search keyword
      this.materialsList = JSON.parse(localStorage.getItem('materials') || '[]').filter((material: any) =>
        material.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    }
  }
}
