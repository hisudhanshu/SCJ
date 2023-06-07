import { Component, OnInit } from '@angular/core';

interface Product {
  id: number;
  name: string;
}

interface Material {
  name: string;
  description: string;
  column1: string;
  column2: string;
  column3: string;
  column4: string;
  column5: string;
  column6: string;
  column7: string;
  column8: string;
  column9: string;
  column10: string;
  column11: string;
  column12: string;
  column13: string;
  column14: string;
  column15: string;
  column16: string;
  column17: string;
  column18: string;
  column19: string;
  column20: string;
  column21: string;
  column22: string;
  column23: string;
  column24: string;
  column25: string;
  column26: string;
  column27: string;
  column28: string;
  column29: string;
  column30: string;
}

@Component({
  selector: 'app-rawmaterialmanagment',
  templateUrl: './rawmaterialmanagment.component.html',
  styleUrls: ['./rawmaterialmanagment.component.css']
})
export class RawmaterialmanagmentComponent implements OnInit {

  products: Product[] = [
    { id: 1, name: 'Bottle' },
    { id: 2, name: 'Polythene' },
    { id: 3, name: 'Polymer' }
  ];

  selectedProduct: number | undefined;
  selectedProductMaterials: Material[] = [];

  ngOnInit(): void {
    // Set the default option as selected
    this.selectedProduct = undefined;
  }

  onProductChange() {
    // Here, you can make an API call or retrieve the related materials
    // for the selected product based on its ID. For simplicity, I'm using
    // static data as an example.

    // Assuming you have a list of materials for each product
    const productMaterials: { [key: number]: Material[] } = {
      1: [
        {
          name: 'Plastic',
          description: 'This is a Bottle Material',
          column1: 'Value 1',
          column2: 'Value 2',
          column3: 'Value 3',
          column4: 'Value 4',
          column5: 'Value 5',
          column6: 'Value 6',
          column7: 'Value 7',
          column8: 'Value 8',
          column9: 'Value 9',
          column10: 'Value 10',
          column11: 'Value 11',
          column12: 'Value 12',
          column13: 'Value 13',
          column14: 'Value 14',
          column15: 'Value 15',
          column16: 'Value 16',
          column17: 'Value 17',
          column18: 'Value 18',
          column19: 'Value 19',
          column20: 'Value 20',
          column21: 'Value 21',
          column22: 'Value 22',
          column23: 'Value 23',
          column24: 'Value 24',
          column25: 'Value 25',
          column26: 'Value 26',
          column27: 'Value 27',
          column28: 'Value 28',
          column29: 'Value 29',
          column30: 'Value 30'
        },
        {
          name: 'Rubber Plastic',
          description: 'Material description',
          column1: 'Value 1',
          column2: 'Value 2',
          column3: 'Value 3',
          column4: 'Value 4',
          column5: 'Value 5',
          column6: 'Value 6',
          column7: 'Value 7',
          column8: 'Value 8',
          column9: 'Value 9',
          column10: 'Value 10',
          column11: 'Value 11',
          column12: 'Value 12',
          column13: 'Value 13',
          column14: 'Value 14',
          column15: 'Value 15',
          column16: 'Value 16',
          column17: 'Value 17',
          column18: 'Value 18',
          column19: 'Value 19',
          column20: 'Value 20',
          column21: 'Value 21',
          column22: 'Value 22',
          column23: 'Value 23',
          column24: 'Value 24',
          column25: 'Value 25',
          column26: 'Value 26',
          column27: 'Value 27',
          column28: 'Value 28',
          column29: 'Value 29',
          column30: 'Value 30'
        }
      ],
      2: [
        {
          name: 'Nylon',
          description: 'Material description',
          column1: 'Value 1',
          column2: 'Value 2',
          column3: 'Value 3',
          column4: 'Value 4',
          column5: 'Value 5',
          column6: 'Value 6',
          column7: 'Value 7',
          column8: 'Value 8',
          column9: 'Value 9',
          column10: 'Value 10',
          column11: 'Value 11',
          column12: 'Value 12',
          column13: 'Value 13',
          column14: 'Value 14',
          column15: 'Value 15',
          column16: 'Value 16',
          column17: 'Value 17',
          column18: 'Value 18',
          column19: 'Value 19',
          column20: 'Value 20',
          column21: 'Value 21',
          column22: 'Value 22',
          column23: 'Value 23',
          column24: 'Value 24',
          column25: 'Value 25',
          column26: 'Value 26',
          column27: 'Value 27',
          column28: 'Value 28',
          column29: 'Value 29',
          column30: 'Value 30'
        },
        {
          name: 'Polythenate',
          description: 'Material description',
          column1: 'Value 1',
          column2: 'Value 2',
          column3: 'Value 3',
          column4: 'Value 4',
          column5: 'Value 5',
          column6: 'Value 6',
          column7: 'Value 7',
          column8: 'Value 8',
          column9: 'Value 9',
          column10: 'Value 10',
          column11: 'Value 11',
          column12: 'Value 12',
          column13: 'Value 13',
          column14: 'Value 14',
          column15: 'Value 15',
          column16: 'Value 16',
          column17: 'Value 17',
          column18: 'Value 18',
          column19: 'Value 19',
          column20: 'Value 20',
          column21: 'Value 21',
          column22: 'Value 22',
          column23: 'Value 23',
          column24: 'Value 24',
          column25: 'Value 25',
          column26: 'Value 26',
          column27: 'Value 27',
          column28: 'Value 28',
          column29: 'Value 29',
          column30: 'Value 30'
        }
      ],
      3: [
        {
          name: 'Polyvinyl chloride (PVC)',
          description: 'Material description',
          column1: 'Value 1',
          column2: 'Value 2',
          column3: 'Value 3',
          column4: 'Value 4',
          column5: 'Value 5',
          column6: 'Value 6',
          column7: 'Value 7',
          column8: 'Value 8',
          column9: 'Value 9',
          column10: 'Value 10',
          column11: 'Value 11',
          column12: 'Value 12',
          column13: 'Value 13',
          column14: 'Value 14',
          column15: 'Value 15',
          column16: 'Value 16',
          column17: 'Value 17',
          column18: 'Value 18',
          column19: 'Value 19',
          column20: 'Value 20',
          column21: 'Value 21',
          column22: 'Value 22',
          column23: 'Value 23',
          column24: 'Value 24',
          column25: 'Value 25',
          column26: 'Value 26',
          column27: 'Value 27',
          column28: 'Value 28',
          column29: 'Value 29',
          column30: 'Value 30'
        },
        {
          name: 'Polystyrene (PS)',
          description: 'Material description',
          column1: 'Value 1',
          column2: 'Value 2',
          column3: 'Value 3',
          column4: 'Value 4',
          column5: 'Value 5',
          column6: 'Value 6',
          column7: 'Value 7',
          column8: 'Value 8',
          column9: 'Value 9',
          column10: 'Value 10',
          column11: 'Value 11',
          column12: 'Value 12',
          column13: 'Value 13',
          column14: 'Value 14',
          column15: 'Value 15',
          column16: 'Value 16',
          column17: 'Value 17',
          column18: 'Value 18',
          column19: 'Value 19',
          column20: 'Value 20',
          column21: 'Value 21',
          column22: 'Value 22',
          column23: 'Value 23',
          column24: 'Value 24',
          column25: 'Value 25',
          column26: 'Value 26',
          column27: 'Value 27',
          column28: 'Value 28',
          column29: 'Value 29',
          column30: 'Value 30'
        }
      ]
    };

    if (this.selectedProduct !== undefined) {
      this.selectedProductMaterials = productMaterials[this.selectedProduct] || [];
    } else {
      this.selectedProductMaterials = [];
    }
  }
}
