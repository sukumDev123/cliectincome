import { Component, OnInit } from "@angular/core"
import { AuthModel } from "src/app/models/auth.model"
import { AuthService } from "src/app/services/auth/auth.service"
import { Router } from "@angular/router"

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"]
})
export class SigninComponent implements OnInit {
  userModel: AuthModel
  submit_ = "Login"
  submit_load = false
  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit() {
    this.userModel = new AuthModel()
    if (this._authService.isLogin()) {
      this._router.navigate(["/user/home"])
    }
  }
  signIn() {
    // console.log(this.userModel)
    // const { email, password } = this.userModel
    this.submit_ = "loading..."
    this.submit_load = true
    this._authService.signInAuth(this.userModel).subscribe(
      d => {
        if (d.status == 200) {
          alert(d.message)
          this.submit_ = "Login"
          this.submit_load = false
          this._authService.setAuth(d.data)
          this._router.navigate(["/user/home"])
        }
      },
      err => {
        const message = err.error.message ? err.error.message : err.error

        this.submit_ = "Login"
        this.submit_load = false
        alert(message)
      }
    )
  }
}
