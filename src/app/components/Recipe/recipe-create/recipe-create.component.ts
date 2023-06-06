import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent implements OnInit {
  showSuccessMessage: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    // Perform necessary operations or API calls to create the recipe

    // Show the success message
    this.showSuccessMessage = true;
  }
}
