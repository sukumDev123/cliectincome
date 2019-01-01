import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { AuthInterFace } from "src/app/models/auth.model"
import { host_api } from "../host"

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private _http: HttpClient) {}
  signInAuth(data): Observable<AuthInterFace> {
    return this._http.post<any>(`${host_api}/api/user/login`, data)
  }
  setAuth(data) {
    return localStorage.setItem("user", JSON.stringify(data))
  }
  isLogin() {
    return localStorage.getItem("user")!!
  }
  getAuth() {
    return JSON.parse(localStorage.getItem("user"))
  }
}
