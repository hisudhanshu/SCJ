import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ChartsComponent } from './components/Data_visual/charts/charts.component';
import { PagesBlankComponent } from './pages/pages-blank/pages-blank.component';
import { PagesContactComponent } from './pages/pages-contact/pages-contact.component';
import { PagesError404Component } from './pages/pages-error404/pages-error404.component';
import { PagesFaqComponent } from './pages/pages-faq/pages-faq.component';
import { PagesLoginComponent } from './pages/pages-login/pages-login.component';
import { PagesRegisterComponent } from './pages/pages-register/pages-register.component';
import { UsersProfileComponent } from './pages/users-profile/users-profile.component';
import { ProductComponent } from './components/addproduct/product.component'; 
import { InvoiceComponent } from './components/invoice/invoice.component';
import { InventoryDetailsComponent } from './components/inventory-details/inventory-details.component';
import { RecipeCreateComponent } from './components/Recipe/recipe-create/recipe-create.component';
import { RecipeEditComponent } from './components/Recipe/recipe-edit/recipe-edit.component';
import { CostComponent } from './components/cost/cost/cost.component';
import { CostAdjustmentComponent } from './components/cost/cost-adjustment/cost-adjustment.component';
import { PricingComponent } from './components/cost/pricing/pricing.component';
import { MonthlyReportsComponent } from './components/reporting/monthly-reports/monthly-reports.component';
import { InsightsComponent } from './components/reporting/insights/insights.component';
import { ImportComponent } from './components/Data/import/import.component';
import { ReconciliationComponent } from './components/Data/reconciliation/reconciliation.component';
import { IdentificationComponent } from './components/Gap/identification/identification.component';
import { ReportingComponent } from './components/Gap/reporting/reporting.component';
import { RawMaterialComponent } from './components/material/raw-material/raw-material.component';
import { ProductMaterialComponent } from './components/material/product-material/product-material.component';
import { RawMasterComponent } from './components/masters/raw-master/raw-master.component';
import { ProductMasterComponent } from './components/masters/product-master/product-master.component';


const routes: Routes = [

  { path: '', component: PagesLoginComponent },
  { path: 'mapproduct', component: ProductComponent},
  { path: 'reporting', component: MonthlyReportsComponent },
  { path: 'insights', component: InsightsComponent },
  { path: 'import', component: ImportComponent},
  { path: 'reconciliation', component: ReconciliationComponent},
  { path: 'identification', component: IdentificationComponent},
  { path: 'gapreporting', component: ReportingComponent},
  { path: 'rawmaterial', component: RawMaterialComponent},
  { path: 'productmaterial', component: ProductMaterialComponent},
  { path: 'rawmaster', component: RawMasterComponent},
  { path: 'productmaster',component: ProductMasterComponent},
  { path: 'cost', component: CostComponent },
  { path: 'costadjustment', component: CostAdjustmentComponent },
  { path: 'price', component: PricingComponent },
  { path: 'recipe', component: RecipeCreateComponent },
  { path: 'editrecipe', component: RecipeEditComponent },
  { path: 'Inventory', component: InventoryDetailsComponent },
  { path: 'invoice', component: InvoiceComponent },
  { path: 'productmaster', component: ProductComponent },
  { path: 'product', component: ProductComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'charts',component:ChartsComponent },
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
