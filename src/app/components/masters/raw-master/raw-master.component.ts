import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/Service/auth-services.service';

@Component({
  selector: 'app-raw-master',
  templateUrl: './raw-master.component.html',
  styleUrls: ['./raw-master.component.css']
})
export class RawMasterComponent implements OnInit {
  products: any[] = [];
  materialName: string = '';
  materialType: string = '';
  currentCost: number = 0;
  vendorInfo: string = '';
  inventoryLevel: number = 0;
  isEditMode: boolean = false;
  editIndex: number = -1;

  constructor(private authService: AuthServicesService) {}

  ngOnInit(): void {
    // Load previously saved data from localStorage
    if (localStorage.getItem('products')) {
      this.products = JSON.parse(localStorage.getItem('products') as string);
    }
  }

  handleSubmit(): void {
    let product: any; // Declare the product variable here
  
    if (this.isEditMode) {
      // Update existing product
      this.products[this.editIndex] = {
        materialName: this.materialName,
        materialType: this.materialType,
        currentCost: this.currentCost,
        vendorInfo: this.vendorInfo,
        inventoryLevel: this.inventoryLevel
      };
      this.isEditMode = false;
      this.editIndex = -1;
    } else {
      // Create new product
      product = {
        materialName: this.materialName,
        materialType: this.materialType,
        currentCost: this.currentCost,
        vendorInfo: this.vendorInfo,
        inventoryLevel: this.inventoryLevel
      };
      this.products.push(product);
    }

    // Save the updated data to localStorage
    localStorage.setItem('products', JSON.stringify(this.products));

   // Save the data to the database
   this.authService.rawmasterData(product).subscribe(
    (response) => {
      console.log('Data saved successfully:', response);
      // Clear the input fields
      this.clearFields();
    },
    (error) => {
      console.error('Error saving data:', error);
    }
  );
  }

  editProduct(index: number): void {
    this.isEditMode = true;
    this.editIndex = index;

    // Set the form fields with the selected product data
    const selectedProduct = this.products[index];
    this.materialName = selectedProduct.materialName;
    this.materialType = selectedProduct.materialType;
    this.currentCost = selectedProduct.currentCost;
    this.vendorInfo = selectedProduct.vendorInfo;
    this.inventoryLevel = selectedProduct.inventoryLevel;
  }

  removeProduct(index: number): void {
    // Remove the product from the array
    this.products.splice(index, 1);

    // Save the updated data to localStorage
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  private clearFields(): void {
    this.materialName = '';
    this.materialType = '';
    this.currentCost = 0;
    this.vendorInfo = '';
    this.inventoryLevel = 0;
  }
}
