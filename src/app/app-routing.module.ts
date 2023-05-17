import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ChartsChartjsComponent } from './components/charts-chartjs/charts-chartjs.component';
import { PagesBlankComponent } from './pages/pages-blank/pages-blank.component';
import { PagesContactComponent } from './pages/pages-contact/pages-contact.component';
import { PagesError404Component } from './pages/pages-error404/pages-error404.component';
import { PagesFaqComponent } from './pages/pages-faq/pages-faq.component';
import { PagesLoginComponent } from './pages/pages-login/pages-login.component';
import { PagesRegisterComponent } from './pages/pages-register/pages-register.component';
import { UsersProfileComponent } from './pages/users-profile/users-profile.component';
import { ProductComponent } from './components/product/product.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { InventoryDetailsComponent } from './components/inventory-details/inventory-details.component';
import { TestingComponent } from './components/testing/testing.component';
import { InventoryAddProductsComponent } from './components/inventory-add-products/inventory-add-products.component';

const routes: Routes = [
  { path: '', component: PagesLoginComponent },
  { path: 'addproduct', component: InventoryAddProductsComponent},
  { path:'testing', component: TestingComponent},
  { path: 'Inventory', component:InventoryDetailsComponent}, 
  { path: 'invoice', component: InvoiceComponent},
  { path: 'productmaster', component: ProductComponent},
  { path: 'product', component: ProductComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'charts-chartjs', component: ChartsChartjsComponent },
  { path: 'pages-blank', component: PagesBlankComponent },
  { path: 'pages-contact', component: PagesContactComponent },
  { path: 'pages-error404', component: PagesError404Component },
  { path: 'pages-faq', component: PagesFaqComponent },
  { path: 'pages-login', component: PagesLoginComponent },
  { path: 'pages-register', component: PagesRegisterComponent },
  { path: 'user-profile', component: UsersProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
