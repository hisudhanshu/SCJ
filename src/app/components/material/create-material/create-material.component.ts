import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/Service/auth-services.service';
@Component({
  selector: 'app-create-material',
  templateUrl: './create-material.component.html',
  styleUrls: ['./create-material.component.css']
})
export class CreateMaterialComponent implements OnInit {
  searchKeyword: string = '';
  material: any = {
    name: '',
    M_type: '',
    code: null,
    M_cost: null,
    M_Vendor: '',
    M_inventory: ''
  };
  constructor(private authService: AuthServicesService) { }

  ngOnInit(): void {

  }
  addMaterial(): void {
    this.authService.insertData(this.material).subscribe(
      (response: any) => {
        console.log('Material added successfully.', response);
        // Reset the form fields
        this.material = {
          name: '',
          M_type: '',
          code: null,
          M_cost: null,
          M_Vendor: '',
          M_inventory: ''
        };
      },
      (error: any) => {
        console.error('Error adding material.', error);
      }
    );
  }
}