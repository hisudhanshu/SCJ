import { Component } from '@angular/core';
interface Element {
  id: number;
  data: string;
}
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  selectedMaterial: string = '';
  elements: Element[] = [];

  onMaterialChange() {
    this.elements = [];
    for (let i = 1; i <= 30; i++) {
      this.elements.push({ id: i, data: '' });
    }
  }

  save() {
    // Handle the save logic here
    console.log('Save button clicked!');
    console.log('Selected Material:', this.selectedMaterial);
    console.log('Elements:', this.elements);
  }
}

