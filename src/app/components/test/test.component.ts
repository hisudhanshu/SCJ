import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/Service/auth-services.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  rawElements: any[] = [];
  selectedMaterialName: string | undefined;
  columnData: string[] = [];
  filteredData: any[] = [];
  materialDropdownData: string[] = [];
  selectedFilteredItem: any;

  constructor(private authService: AuthServicesService) {}

  ngOnInit() {
    this.authService.getRawElements().subscribe(
      (data: any) => {
        this.rawElements = data.matdata.filter((item: any) => item.name !== "");
        if (this.rawElements.length > 0) {
          this.columnData = Object.keys(this.rawElements[0]).filter((key) => key !== 'id' && key !== 'name') as string[];
        }
      },
      (error: any) => {
        console.error('Failed to fetch raw elements:', error);
      }
    );
  }

  onNameSelected(name: string) {
    this.selectedMaterialName = name;
    const selectedItem = this.rawElements.find((item: any) => item.name === name);
    if (selectedItem) {
      this.filteredData = [selectedItem];
      this.materialDropdownData = Object.values(selectedItem).slice(2).filter((value: any, index: number) => typeof value === 'string' && value !== '' && index > 15) as string[];
    } else {
      this.filteredData = [];
      this.materialDropdownData = [];
    }
    this.selectedFilteredItem = undefined; // Reset the selected item
  }

  getItemLabel(item: any): string {
    return this.columnData.map(column => item[column]).join(' | ');
  }
}
