import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/Service/auth-services.service';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.css']
})
export class ViewRecipeComponent implements OnInit {
  materials: any[] | undefined;
  filteredMaterials: any[] | undefined;
  searchQuery: string = '';

  constructor(private authService: AuthServicesService) { }

  ngOnInit() {
    this.getMaterials();
  }

  getMaterials() {
    this.authService.getMaterials().subscribe(
      (response: any) => {
        if (response.isSuccess && response.matdata !== null) {
          this.materials = response.matdata;
          this.filteredMaterials = response.matdata; // Initialize filteredMaterials with all materials
        } else {
          console.log('API request failed or no data received');
        }
      },
      (error: any) => {
        console.log('Error fetching materials:', error);
      }
    );
  }

  searchMaterials() {
    if (!this.searchQuery) {
      // If searchQuery is empty, reset filteredMaterials to show all materials
      this.filteredMaterials = this.materials;
    } else {
      // Perform the search operation on materials based on the search query
      this.filteredMaterials = this.materials?.filter(material =>
        material?.name?.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
}
