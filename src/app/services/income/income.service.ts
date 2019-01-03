import { Injectable } from "@angular/core"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs"
import { AuthInterFace } from "src/app/models/auth.model"
import { host_api } from "../host"

@Injectable({
  providedIn: "root"
})
export class IncomeService {
  constructor(private _http: HttpClient) {}
  getListByEmail(email): Observable<AuthInterFace> {
    // const headers = new HttpHeaders()
    // headers.append("Authorization", `sukum-lnopq`)

    return this._http.get<any>(`${host_api}/api/income/list/${email}`)
  }
  addNewIncome(data): Observable<AuthInterFace> {
    return this._http.post<any>(`${host_api}/api/income/add/new`, data)
  }
}
