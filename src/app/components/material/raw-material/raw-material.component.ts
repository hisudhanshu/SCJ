import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/Service/auth-services.service';

interface RawMaterial {
 
  name: string;
  MaterialType: string;
  CurrentCost: string;
  VendorInfo: string;
  InventoryLevel: string;
}

@Component({
  selector: 'app-raw-material',
  templateUrl: './raw-material.component.html',
  styleUrls: ['./raw-material.component.css']
})
export class RawMaterialComponent implements OnInit {
  rawMaterials: RawMaterial[] = [];
  newRawMaterial: RawMaterial = { name: '', MaterialType: '', CurrentCost: '', VendorInfo: '', InventoryLevel: '' };
  isEditing: boolean[] = [];
  searchKeyword: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthServicesService) { }

  ngOnInit(): void {
    // Load the data from localStorage on component initialization
    const savedData = localStorage.getItem('rawMaterials');
    if (savedData) {
      this.rawMaterials = JSON.parse(savedData);
    }
  }

  insertData() {
    const newMaterial: RawMaterial = { ...this.newRawMaterial };

    // Check if the material already exists
    const existingMaterial = this.rawMaterials.find(material => material.name.toLowerCase() === newMaterial.name.toLowerCase());
    if (existingMaterial) {
      this.errorMessage = 'Material already exists.';
      this.successMessage = '';

      // Hide success message after 2 seconds
      setTimeout(() => {
        this.successMessage = '';
      }, 2000);

      return;
    }

    this.authService.insertData(newMaterial).subscribe(
      (response: any) => {
        console.log('Data inserted successfully:', response);
      
        this.rawMaterials.push(newMaterial);
        // this.saveDataToLocalStorage(); // Save data to localStorage
        this.newRawMaterial = {  name: '', MaterialType: '', CurrentCost: '', VendorInfo: '', InventoryLevel: '' };
        this.successMessage = 'Material added successfully.';
        this.errorMessage = '';

        // Display alert message
        alert('Data saved successfully!');

        // Hide success message after 2 seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 2000);
      },
      (error: any) => {
        console.error('Error inserting data:', error);
        this.errorMessage = 'Failed to add material.';
        this.successMessage = '';
      }
    );
  }

  editData(index: number) {
    this.isEditing[index] = true;
  }

  saveData(index: number) {
    if (confirm('Are you sure you want to save this material?')) {
      this.isEditing[index] = false;
     // this.saveDataToLocalStorage(); // Save data to localStorage after editing
    }
  }

  removeData(index: number) {
    if (confirm('Are you sure you want to remove this material?')) {
      this.rawMaterials.splice(index, 1);
     // this.saveDataToLocalStorage(); // Save data to localStorage after removal
    }
  }

  search() {
    // If searchKeyword is empty, show all the data
    if (this.searchKeyword.trim() === '') {
      const savedData = localStorage.getItem('rawMaterials');
      if (savedData) {
        this.rawMaterials = JSON.parse(savedData);
      }
      return;
    }

    // Filter the rawMaterials array based on the searchKeyword
    this.rawMaterials = this.rawMaterials.filter(material =>
      material.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
    );
  }

  private saveDataToLocalStorage() {
    localStorage.setItem('rawMaterials', JSON.stringify(this.rawMaterials));
  }
}
