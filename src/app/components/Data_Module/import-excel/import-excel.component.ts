// Angular code
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

  uploadConfirmed(): void {
    if (!this.fileToUpload) {
      console.error('File to upload is null.');
      return;
    }

    this.loading = true;
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload!);

    this.authService.uploadFile(formData).subscribe(
      (response) => {
        this.loading = false;
        this.shortLink = true;
        console.log('File uploaded successfully');
        this.showSuccessModal();
        setTimeout(() => {
          this.hideSuccessModal();
        }, 2000);
      },
      (error) => {
        this.loading = false;
        this.showErrorModal();
        setTimeout(() => {
          this.hideErrorModal();
        }, 2000);
      }
    );
  }

  // ... (Existing code) ...

  showConfirmModal(): void {
    const confirmModal = document.getElementById('confirmModal');
    if (confirmModal) {
      confirmModal.style.display = 'block';
    }
  }

  hideConfirmModal(): void {
    const confirmModal = document.getElementById('confirmModal');
    if (confirmModal) {
      confirmModal.style.display = 'none';
    }
  }

  showSuccessModal(): void {
    const successModal = document.getElementById('successModal');
    if (successModal) {
      successModal.style.display = 'block';
    }
  }

  hideSuccessModal(): void {
    const successModal = document.getElementById('successModal');
    if (successModal) {
      successModal.style.display = 'none';
    }
  }

  showErrorModal(): void {
    const errorModal = document.getElementById('errorModal');
    if (errorModal) {
      errorModal.style.display = 'block';
    }
  }

  hideErrorModal(): void {
    const errorModal = document.getElementById('errorModal');
    if (errorModal) {
      errorModal.style.display = 'none';
    }
  }
}