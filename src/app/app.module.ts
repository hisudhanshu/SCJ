import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductService } from './Service/productservice.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ChartsComponent } from './components/Data_visual/charts/charts.component'; 
import { UsersProfileComponent } from './pages/users-profile/users-profile.component';
import { PagesFaqComponent } from './pages/pages-faq/pages-faq.component';
import { PagesContactComponent } from './pages/pages-contact/pages-contact.component';
import { PagesRegisterComponent } from './pages/pages-register/pages-register.component';
import { PagesLoginComponent } from './pages/pages-login/pages-login.component';
import { PagesError404Component } from './pages/pages-error404/pages-error404.component';
import { PagesBlankComponent } from './pages/pages-blank/pages-blank.component';
import { ProductComponent } from './components/addproduct/product.component'; 
import { InvoiceComponent } from './components/invoice/invoice.component';
import { InventoryDetailsComponent } from './components/inventory-details/inventory-details.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeCreateComponent } from './components/Recipe/recipe-create/recipe-create.component';
import { RecipeEditComponent } from './components/Recipe/recipe-edit/recipe-edit.component';
import { CostAdjustmentComponent } from './components/cost/cost-adjustment/cost-adjustment.component';
import { PricingComponent } from './components/cost/pricing/pricing.component';
import { MonthlyReportsComponent } from './components/reporting/monthly-reports/monthly-reports.component';
import { InsightsComponent } from './components/reporting/insights/insights.component';
import { RawMasterComponent } from './components/masters/raw-master/raw-master.component';
import { ProductMasterComponent } from './components/masters/product-master/product-master.component';
import { ProductMaterialComponent } from './components/material/product-material/product-material.component';
import { RawmaterialmanagmentComponent } from './components/material/rawmaterialmanagment/rawmaterialmanagment.component';
import { TestComponent } from './components/test/test.component';
import { CreateMaterialComponent } from './components/material/create-material/create-material.component';
import { MaterialViewComponent } from './components/material/material-view/material-view.component';
import { ViewRecipeComponent } from './components/Recipe/view-recipe/view-recipe.component';
import { RecipeComparisonComponent } from './components/Recipe/recipe-comparison/recipe-comparison.component';
import { ViewFullrecipeComponent } from './components/Recipe/view-fullrecipe/view-fullrecipe.component';
import { ImportExcelComponent } from './components/Data_Module/import-excel/import-excel.component';
import { ReconciliationComponent } from './components/Data_Module/reconciliation/reconciliation.component';
import { ViewReconciliationComponent } from './components/Data_Module/view-reconciliation/view-reconciliation.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    UsersProfileComponent,
    PagesFaqComponent,
    PagesContactComponent,
    PagesRegisterComponent,
    PagesLoginComponent,
    PagesError404Component,
    PagesBlankComponent,
    ProductComponent,
    InvoiceComponent,
    InventoryDetailsComponent,
    RecipeCreateComponent,
    RecipeEditComponent,
    CostAdjustmentComponent,
    PricingComponent,
    MonthlyReportsComponent,
    InsightsComponent,
    ChartsComponent,
    RawMasterComponent,
    ProductMasterComponent,
    ProductMaterialComponent,
    RawmaterialmanagmentComponent,
    TestComponent,
    CreateMaterialComponent,
    MaterialViewComponent,
    ViewRecipeComponent,
    RecipeComparisonComponent,
    ViewFullrecipeComponent,
    ImportExcelComponent,
    ReconciliationComponent,
    ViewReconciliationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
