import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthServicesService } from 'src/app/Service/auth-services.service';

@Component({
  selector: 'app-import-excel',
  templateUrl: './import-excel.component.html',
  styleUrls: ['./import-excel.component.css']
})
export class ImportExcelComponent implements OnInit {

  loading: boolean = false;
  shortLink: boolean = false;
  fileToUpload: File | null = null;

  constructor(private authService: AuthServicesService, private http: HttpClient) { }

  ngOnInit(): void {
  }
    // Function to handle the file selection
    handleFileInput(event: any): void {
      const files: FileList = event.target.files;
      if (files.length > 0) {
        this.fileToUpload = files.item(0);
      }
    }

  uploadFile(): void {
    if (this.fileToUpload) {
      this.showConfirmModal();
    }
  }

  // Function to handle the confirmed upload
  uploadConfirmed(): void {
    this.loading = true; // Show loading indicator

    // Prepare the form data with the file to upload
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload!);

    // Call the API to upload the file
    this.http.post<any>(`${this.authService.urlprefix}api/your-upload-endpoint`, formData)
      .subscribe(
        (response) => {
          // Handle successful response (if needed)
          this.loading = false;
          this.shortLink = true;
          this.showSuccessModal();
          setTimeout(() => {
            this.hideSuccessModal();
          }, 2000);
        },
        (error) => {
          // Handle error (if needed)
          this.loading = false;
          this.showErrorModal();
          setTimeout(() => {
            this.hideErrorModal();
          }, 2000);
        }
      );
  }

  // Function to show the confirm modal
  showConfirmModal(): void {
    const confirmModal = document.getElementById('confirmModal');
    if (confirmModal) {
      confirmModal.style.display = 'block';
    }
  }

  // Function to hide the confirm modal
  hideConfirmModal(): void {
    const confirmModal = document.getElementById('confirmModal');
    if (confirmModal) {
      confirmModal.style.display = 'none';
    }
  }

  // Function to show the success modal
  showSuccessModal(): void {
    const successModal = document.getElementById('successModal');
    if (successModal) {
      successModal.style.display = 'block';
    }
  }

  // Function to hide the success modal
  hideSuccessModal(): void {
    const successModal = document.getElementById('successModal');
    if (successModal) {
      successModal.style.display = 'none';
    }
  }

  // Function to show the error modal
  showErrorModal(): void {
    const errorModal = document.getElementById('errorModal');
    if (errorModal) {
      errorModal.style.display = 'block';
    }
  }

  // Function to hide the error modal
  hideErrorModal(): void {
    const errorModal = document.getElementById('errorModal');
    if (errorModal) {
      errorModal.style.display = 'none';
    }
  }
}
