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
import { IdentificationComponent } from './components/Gap/identification/identification.component';
import { ReportingComponent } from './components/Gap/reporting/reporting.component';
import { ProductMaterialComponent } from './components/material/product-material/product-material.component';
import { RawMasterComponent } from './components/masters/raw-master/raw-master.component';
import { ProductMasterComponent } from './components/masters/product-master/product-master.component';
import { RawmaterialmanagmentComponent } from './components/material/rawmaterialmanagment/rawmaterialmanagment.component';
import { TestComponent } from './components/test/test.component';
import { CreateMaterialComponent } from './components/material/create-material/create-material.component';
import { MaterialViewComponent } from './components/material/material-view/material-view.component';
import { ViewRecipeComponent } from './components/Recipe/view-recipe/view-recipe.component';
import { RecipeComparisonComponent } from './components/Recipe/recipe-comparison/recipe-comparison.component';
import { ViewFullrecipeComponent } from './components/Recipe/view-fullrecipe/view-fullrecipe.component';
import { ImportExcelComponent } from './components/Data_Module/import-excel/import-excel.component';
import { ReconciliationComponent } from './components/Data_Module/reconciliation/reconciliation.component';


const routes: Routes = [

  { path: '', component: PagesLoginComponent },
  { path: 'viewfullrecipe/:id', component: ViewFullrecipeComponent},
  { path: 'comparison', component: RecipeComparisonComponent },
  { path: 'viewrecipe', component: ViewRecipeComponent },
  { path: 'viewmaterial', component: MaterialViewComponent },
  { path: 'creatematerial', component: CreateMaterialComponent },
  { path: 'test', component: TestComponent },
  { path: 'rawmaterialmanagment', component: RawmaterialmanagmentComponent },
  { path: 'mapproduct', component: ProductComponent },
  { path: 'reporting', component: MonthlyReportsComponent },
  { path: 'insights', component: InsightsComponent },
  { path: 'identification', component: IdentificationComponent },
  { path: 'gapreporting', component: ReportingComponent },
  { path: 'productmaterial', component: ProductMaterialComponent },
  { path: 'rawmaster', component: RawMasterComponent },
  { path: 'productmaster', component: ProductMasterComponent },
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
  { path: 'charts', component: ChartsComponent },
  { path: 'pages-contact', component: PagesContactComponent },
  { path: 'pages-error404', component: PagesError404Component },
  { path: 'pages-faq', component: PagesFaqComponent },
  { path: 'pages-login', component: PagesLoginComponent },
  { path: 'pages-register', component: PagesRegisterComponent },
  { path: 'user-profile', component: UsersProfileComponent },
  { path: 'importexcel', component: ImportExcelComponent},
  { path: 'reconciliation', component: ReconciliationComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]


})
export class AppRoutingModule { }
