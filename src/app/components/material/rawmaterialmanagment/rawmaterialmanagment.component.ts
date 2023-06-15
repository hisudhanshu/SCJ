import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/Service/auth-services.service';

interface Material {
  id: number;
  name: string;
}

interface Element {
  id: number;
  data: string;
}

interface RequestData {
  id: number;
  [key: string]: string | number;
}

@Component({
  selector: 'app-rawmaterialmanagment',
  templateUrl: './rawmaterialmanagment.component.html',
  styleUrls: ['./rawmaterialmanagment.component.css']
})
export class RawmaterialmanagmentComponent implements OnInit {
  materials: Material[] = [];
  selectedMaterial: string = '';
  elements: Element[] = [];

  constructor(private authService: AuthServicesService) {}

  ngOnInit() {
    this.authService.getMaterials().subscribe((response: any) => {
      if (response.isSuccess && response.matdata) {
        this.materials = response.matdata;
      } else {
        console.log('API request failed');
      }
    });
  }

  onMaterialChange() {
    const selectedMaterial = this.materials.find((material) => material.id.toString() === this.selectedMaterial);
    this.elements = [];

    if (selectedMaterial) {
      const existingElementData = this.getElementDataFromDatabase(selectedMaterial.id);
      if (existingElementData) {
        this.elements = existingElementData;
      } else {
        for (let i = 1; i <= 5; i++) {
          this.elements.push({ id: selectedMaterial.id, data: '' });
        }
      }
    }
  }

  getElementDataFromDatabase(materialId: number): Element[] | null {
    // Here you can implement the logic to fetch the element data from the database using the materialId.
    // If data is available, return it as an array of Element objects.
    // If data is not available, return null.
    // Example:
    // Call a service method to fetch the data from the database and return the response.
    // return this.authService.getElementData(materialId);
    return null; // Replace this with your implementation
  }

  saveElementDataToDatabase(materialId: number, elements: Element[]): void {
    const requestData: RequestData = { id: materialId };

    elements.forEach((element, index) => {
      requestData[String.fromCharCode(65 + index)] = element.data;
    });

    this.authService.saveElementData(requestData).subscribe(
      (response) => {
        console.log('Save successful:', response);
        alert('Data saved successfully!');
      },
      (error) => {
        console.error('Save failed:', error);
        alert('Failed to save data.');
      }
    );
  }

  addElement() {
    const newElementId = this.elements.length + 1;
    this.elements.push({ id: Number(this.selectedMaterial), data: '' });
  }

  removeElement(index: number) {
    this.elements.splice(index, 1);
  }

  save() {
    console.log('Save button clicked!');
    console.log('Selected Material:', this.selectedMaterial);
    console.log('Elements:', this.elements);

    const hasEmptyElement = this.elements.some((element) => element.data === '');

    if (this.selectedMaterial === '' || hasEmptyElement) {
      alert('Please enter all element data');
      return;
    }

    const dataToSave = {
      selectedMaterial: this.selectedMaterial,
      elements: this.elements
    };

    // Save the element data to the database
    this.saveElementDataToDatabase(Number(this.selectedMaterial), this.elements);
  }
}
