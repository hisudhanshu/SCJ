import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/Service/auth-services.service';

@Component({
  selector: 'app-material-view',
  templateUrl: './material-view.component.html',
  styleUrls: ['./material-view.component.css']
})
export class MaterialViewComponent implements OnInit {
  materials: any[] | undefined;

  constructor(private authService: AuthServicesService) { }

  ngOnInit() {
    this.getMaterials();
  }

  getMaterials() {
    this.authService.getMaterials().subscribe(
      (response: any) => {
        if (response.isSuccess && response.matdata !== null) {
          this.materials = response.matdata;
        } else {
          console.log('API request failed or no data received');
        }
      },
      (error: any) => {
        console.log('Error fetching materials:', error);
      }
    );
  }
}
