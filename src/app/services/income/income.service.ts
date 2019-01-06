import { Injectable } from "@angular/core"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable, BehaviorSubject } from "rxjs"
import { AuthInterFace } from "src/app/models/auth.model"
import { host_api } from "../host"
import { IncomeInterface } from "src/app/present/income.interface"
import { incomeData } from "src/app/controller/user/home/home.component"

@Injectable({
  providedIn: "root"
})
export class IncomeService {
  dataBe: BehaviorSubject<IncomeInterface>
  constructor(private _http: HttpClient) {
    this.dataBe = new BehaviorSubject<IncomeInterface>({
      all: new incomeData(),
      income: []
    })
  }
  getListByEmail(email): Observable<AuthInterFace> {
    return this._http.get<any>(`${host_api}/api/income/list/${email}`)
  }
  addNewIncome(data): Observable<AuthInterFace> {
    return this._http.post<any>(`${host_api}/api/income/add/new`, data)
  }
  getData() {
    return this.dataBe.asObservable()
  }
  setDataIncome(data: IncomeInterface) {
    this.dataBe.next(data)
  }
}
