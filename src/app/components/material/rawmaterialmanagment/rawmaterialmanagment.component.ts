import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/Service/auth-services.service';

interface Element {
  id: number;
  data: string;
}

@Component({
  selector: 'app-rawmaterialmanagment',
  templateUrl: './rawmaterialmanagment.component.html',
  styleUrls: ['./rawmaterialmanagment.component.css']
})
export class RawmaterialmanagmentComponent implements OnInit {
  materials: any[] | undefined; // Array to hold the materials data from the API response
  selectedMaterial: string = ''; // Variable to store the selected material
  elements: Element[] = [];

  constructor(private authService: AuthServicesService) {}

  // Raw Material Management API data Get here
  ngOnInit() {
    this.authService.getMaterials().subscribe((response: any) => {
      if (response.isSuccess) {
        this.materials = response.matdata;
      } else {
        console.log('API request failed');
      }
    });
  }

  onMaterialChange() {
    this.elements = [
      { id: 1, data: 'Ethylene' },
      { id: 2, data: 'Catalysts' },
      { id: 3, data: 'Co-monomers' },
      { id: 4, data: 'Antioxidants' },
      { id: 5, data: 'Stabilizers' },
      { id: 6, data: 'Anti-block-agent' }
    ];
  }

  addElement() {
    const newElementId = this.elements.length + 1;
    this.elements.push({ id: newElementId, data: '' });
  }

  removeElement(index: number) {
    this.elements.splice(index, 1);
  }

  save() {
    console.log('Save button clicked!');
    console.log('Selected Material:', this.selectedMaterial);
    console.log('Elements:', this.elements);

    // Check if any element data is empty
    const hasEmptyElement = this.elements.some((element) => element.data === '');

    if (this.selectedMaterial === '' || hasEmptyElement) {
      alert('Please enter all element data');
      return;
    }

    const dataToSave = {
      selectedMaterial: this.selectedMaterial,
      elements: this.elements
    };

    this.authService.saveElementData(dataToSave).subscribe(
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
}
