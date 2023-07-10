// recipe-comparison.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-comparison',
  templateUrl: './recipe-comparison.component.html',
  styleUrls: ['./recipe-comparison.component.css']
})
export class RecipeComparisonComponent implements OnInit {

  selectedProduct: string = '';
  selectedRecipe: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  addData(): void {
    this.selectedProduct = (document.getElementById('name') as HTMLSelectElement).value;
    this.selectedRecipe = (document.getElementById('Recipe') as HTMLSelectElement).value;
    localStorage.setItem('selectedProduct', this.selectedProduct);
    localStorage.setItem('selectedRecipe', this.selectedRecipe);
    this.showModal();
  }

  showModal(): void {
    const modal = document.getElementsByClassName('modal')[0] as HTMLElement;
    modal.style.display = 'block';
  }

  saveChanges(): void {
    // Handle save changes functionality here
    const modal = document.getElementsByClassName('modal')[0] as HTMLElement;
    modal.style.display = 'none';
  }

}
