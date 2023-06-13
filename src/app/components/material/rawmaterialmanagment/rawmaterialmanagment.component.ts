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
  selectedMaterial: string = '';
  elements: Element[] = [];

  constructor(private authService: AuthServicesService) {}

  ngOnInit(): void {}

  onMaterialChange() {
    this.elements = [];
    for (let i = 1; i <= 6; i++) {
      this.elements.push({ id: i, data: '' });
    }
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
