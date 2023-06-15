import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit{


  constructor() {}

  ngOnInit() {
  }
}

// import { Component, OnInit } from '@angular/core';
// import { AuthServicesService } from 'src/app/Service/auth-services.service';

// interface Material {
//   id: number;
//   name: string;
// }

// interface Element {
//   id: number;
//   data: string;
// }

// @Component({
//   selector: 'app-rawmaterialmanagment',
//   templateUrl: './rawmaterialmanagment.component.html',
//   styleUrls: ['./rawmaterialmanagment.component.css']
// })
// export class RawmaterialmanagmentComponent implements OnInit {
//   materials: Material[] = [];
//   selectedMaterial: string = '';
//   elements: Element[] = [];

//   constructor(private authService: AuthServicesService) {}

//   ngOnInit() {
//     this.authService.getMaterials().subscribe((response: any) => {
//       if (response.isSuccess && response.matdata) {
//         this.materials = response.matdata;
//       } else {
//         console.log('API request failed');
//       }
//     });
//   }

//   onMaterialChange() {
//     const selectedMaterial = this.materials.find((material) => material.id.toString() === this.selectedMaterial);
//     this.elements = [];

//     if (selectedMaterial) {
//       this.elements.push({ id: selectedMaterial.id, data: selectedMaterial.name });
//     }
//   }

//   addElement() {
//     const newElementId = this.elements.length + 1;
//     this.elements.push({ id: newElementId, data: '' });
//   }

//   removeElement(index: number) {
//     this.elements.splice(index, 1);
//   }

//   save() {
//     console.log('Save button clicked!');
//     console.log('Selected Material:', this.selectedMaterial);
//     console.log('Elements:', this.elements);

//     const hasEmptyElement = this.elements.some((element) => element.data === '');

//     if (this.selectedMaterial === '' || hasEmptyElement) {
//       alert('Please enter all element data');
//       return;
//     }

//     const dataToSave = {
//       selectedMaterial: this.selectedMaterial,
//       elements: this.elements
//     };

//     this.authService.saveElementData(dataToSave).subscribe(
//       (response) => {
//         console.log('Save successful:', response);
//         alert('Data saved successfully!');
//       },
//       (error) => {
//         console.error('Save failed:', error);
//         alert('Failed to save data.');
//       }
//     );
//   }
// }
