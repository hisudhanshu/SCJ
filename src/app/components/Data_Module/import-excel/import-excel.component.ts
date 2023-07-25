import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-import-excel',
  templateUrl: './import-excel.component.html',
  styleUrls: ['./import-excel.component.css']
})
export class ImportExcelComponent implements OnInit {

  loading: boolean = false;
  shortLink: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  // Function to handle the upload button click event
  uploadFile(): void {
    // Show the confirm modal
    this.showConfirmModal();
  }

  // Function to handle the confirmed upload
  uploadConfirmed(): void {
    this.loading = true; // Show loading indicator

    // Simulate the file upload process (replace this with your actual file upload logic)
    setTimeout(() => {
      const uploadSuccess = true; // Change this based on whether the upload was successful or not

      if (uploadSuccess) {
        this.loading = false;
        this.shortLink = true;
        this.showSuccessModal();
      } else {
        this.loading = false;
        this.showErrorModal();
      }
    }, 2000); // Simulating a delay of 2 seconds for demonstration purposes
  }

  // Function to show the confirm modal
  showConfirmModal(): void {
    const confirmModal = document.getElementById('confirmModal');
    if (confirmModal) {
      confirmModal.style.display = 'block';
    }
  }

  // Function to show the success modal
  showSuccessModal(): void {
    const successModal = document.getElementById('successModal');
    if (successModal) {
      successModal.style.display = 'block';
    }
  }

  // Function to show the error modal
  showErrorModal(): void {
    const errorModal = document.getElementById('errorModal');
    if (errorModal) {
      errorModal.style.display = 'block';
    }
  }
}