import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/Service/auth-services.service';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.css']
})
export class ViewRecipeComponent implements OnInit {
  recipes: any[] = []; // Array to store the recipes data

  constructor(private authService: AuthServicesService) { }

  ngOnInit(): void {
    this.authService.getRecipes().subscribe(
      (response: any[]) => {
        this.recipes = response; // Assign the API response to the recipes array
      },
      (error) => {
        console.error('Error fetching recipes:', error);
      }
    );
  }
}
