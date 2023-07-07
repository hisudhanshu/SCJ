import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/Service/auth-services.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  getRecipes: any[] | undefined;
  filteredgetRecipes: any[] | undefined;
  searchQuery: string = '';

  constructor(private authService: AuthServicesService) { }

  ngOnInit() {
    this.getMaterials();
  }

  getMaterials() {
    this.authService.getRecipes().subscribe(
      (response: any) => {
        if (response.isSuccess && response.matdata !== null) {
          this.getRecipes = response.matdata;
          this.filteredgetRecipes = response.matdata; // Initialize filteredMaterials with all materials
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
      this.filteredgetRecipes = this.getRecipes;
    } else {
      // Perform the search operation on materials based on the search query
      this.filteredgetRecipes = this.getRecipes?.filter(getRecipes =>
        getRecipes?.name?.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
}
