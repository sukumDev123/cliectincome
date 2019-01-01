import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"
import { SigninComponent } from "./controller/auth/signin/signin.component"
import { SignupComponent } from "./controller/auth/signup/signup.component"
import { AuthComponent } from "./controller/auth/auth.component"
import { UserComponent } from "./controller/user/user.component"
import { HomeComponent } from "./controller/user/home/home.component"
import { AddIncomeComponent } from "./controller/user/add-income/add-income.component"

const routes: Routes = [
  {
    path: "auth",
    component: AuthComponent,
    children: [
      {
        path: "signin",
        component: SigninComponent
      },
      {
        path: "signup",
        component: SignupComponent
      }
    ]
  },
  {
    path: "user",
    component: UserComponent,
    children: [
      {
        path: "home",
        component: HomeComponent
      },
      {
        path: "add",
        component: AddIncomeComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
