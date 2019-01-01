import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { AuthInterFace } from "src/app/models/auth.model"
import { host_api } from "../host"

@Injectable({
  providedIn: "root"
})
export class IncomeService {
  constructor(private _http: HttpClient) {}
  getListByEmail(email): Observable<AuthInterFace> {
    return this._http.get<any>(`${host_api}/api/income/list/${email}`)
  }
}
