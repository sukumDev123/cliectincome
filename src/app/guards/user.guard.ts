import { Injectable } from "@angular/core"
import { CanActivate, Router } from "@angular/router"

import { AuthService } from "../services/auth/auth.service"

@Injectable({
  providedIn: "root"
})
export class UserGuard implements CanActivate {
  constructor(private _user: AuthService, private _router: Router) {}

  canActivate(): boolean {
    if (this._user.isLogin()) {
      return true
    } else {
      this._router.navigate(["/auth/signin"])
      return false
    }
  }
}
