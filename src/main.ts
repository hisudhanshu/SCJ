import 'xlsx/dist/xlsx.full.min.js'; // Import the ExcelPackage library
import 'xlsx/dist/xlsx.core.min.js'; // Import the ExcelPackage core library

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
// // Set the license context before bootstrapping the Angular app
// Xlsx.utils.setLicenseKey('your_license_key_here');  

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));