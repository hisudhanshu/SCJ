import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/Service/auth-services.service';


@Component({
  selector: 'app-raw-material',
  templateUrl: './raw-material.component.html',
  styleUrls: ['./raw-material.component.css']
})
export class RawMaterialComponent implements OnInit {
  name: string | undefined;
  // email: string | undefined;

  constructor(private authService: AuthServicesService) { }

  ngOnInit(): void {
    // You can remove the line below as it is throwing an error and not implemented
    // throw new Error('Method not implemented.');
  }

  insertData() {
    const data = { name: this.name };
    this.authService.insertData(data).subscribe(
      (response: any) => {
        console.log('Data inserted successfully:', response);
        // Reset form values after successful insertion
        this.name = '';
        // this.email = '';
      },
      (error: any) => {
        console.error('Error inserting data:', error);
      }
    );
  }
}
