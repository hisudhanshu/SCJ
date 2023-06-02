import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/Service/auth-services.service';

interface RawMaterial {
  id: number;
  name: string;
}

@Component({
  selector: 'app-raw-material',
  templateUrl: './raw-material.component.html',
  styleUrls: ['./raw-material.component.css']
})
export class RawMaterialComponent implements OnInit {
  rawMaterials: RawMaterial[] = [];
  newRawMaterial: RawMaterial = { id: 0, name: '' };
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
      return;
    }

    this.authService.insertData(newMaterial).subscribe(
      (response: any) => {
        console.log('Data inserted successfully:', response);
        this.rawMaterials.push(newMaterial);
        this.saveDataToLocalStorage(); // Save data to localStorage
        this.newRawMaterial.name = '';
        this.successMessage = 'Material added successfully.';
        this.errorMessage = '';
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
      this.saveDataToLocalStorage(); // Save data to localStorage after editing
    }
  }

  removeData(index: number) {
    if (confirm('Are you sure you want to remove this material?')) {
      this.rawMaterials.splice(index, 1);
      this.saveDataToLocalStorage(); // Save data to localStorage after removal
    }
  }

  search() {
    // Filter the rawMaterials array based on the searchKeyword
    const filteredMaterials = this.rawMaterials.filter(material =>
      material.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
    );

    // Update the rawMaterials array with the filtered results
    this.rawMaterials = filteredMaterials;
  }

  private saveDataToLocalStorage() {
    localStorage.setItem('rawMaterials', JSON.stringify(this.rawMaterials));
  }
}