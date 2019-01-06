import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { SigninComponent } from "./controller/auth/signin/signin.component"
import { SignupComponent } from "./controller/auth/signup/signup.component"
import { AuthComponent } from "./controller/auth/auth.component"
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http"
import { FormsModule } from "@angular/forms"
import { UserComponent } from "./controller/user/user.component"
import { HomeComponent } from "./controller/user/home/home.component"
import { AddIncomeComponent } from "./controller/user/add-income/add-income.component"
import { AuthInterceprot } from "./AuthInterceprot";
import { ErrComponent } from './controller/err/err.component';
import { NotFoundComponent } from './controller/not-found/not-found.component';
import { ChartComponent } from './controller/chart/chart.component'
@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    AuthComponent,
    UserComponent,
    HomeComponent,
    AddIncomeComponent,
    ErrComponent,
    NotFoundComponent,
    ChartComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceprot, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
