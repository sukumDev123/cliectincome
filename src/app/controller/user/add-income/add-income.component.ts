import { Component, OnInit } from "@angular/core"
import { IncomeService } from "src/app/services/income/income.service"
import { AuthService } from "src/app/services/auth/auth.service"
import { BehaviorSubject, Observable } from "rxjs"

@Component({
  selector: "app-add-income",
  templateUrl: "./add-income.component.html",
  styleUrls: ["./add-income.component.css"]
})
export class AddIncomeComponent implements OnInit {
  incomeData = {
    price: 0,
    type: 0,
    detail: ``,
    email: ""
  }
  subMitObser: BehaviorSubject<any>
  subMitObservable: Observable<any>
  submit_ = "submit"
  submit_load = false
  constructor(private _incomeS: IncomeService, private _auth: AuthService) {}

  ngOnInit() {
    document.getElementById("loader_bk").style.display = "none"
    this.subMitObser = new BehaviorSubject<any>({
      submit: this.submit_,
      status: this.submit_load
    })
    this.subMitObservable = this.subMitObser.asObservable()
    this.subMitObservable.subscribe(d => {
      this.submit_ = d.submit
      this.submit_load = d.status
    })
    if (this._auth.isLogin()) {
      const email = this._auth.getAuth().email
      this.incomeData.email = email
    }
  }
  addIncome() {
    this.subMitObser.next({ submit: "add to database...", status: true })

    const email = this.incomeData.email
    if (
      this.incomeData.detail &&
      this.incomeData.price &&
      this.incomeData.type
    ) {
      this._incomeS.addNewIncome(this.incomeData).subscribe(
        d => {
          if (d.status == 200) {
            alert(d.message)
            this.incomeData = {
              detail: "",
              type: 0,
              price: 0,
              email: email
            }
            this.subMitObser.next({ submit: "submit", status: false })
          }
        },
        e => {
          alert(JSON.stringify(e))
          this.subMitObser.next({ submit: "submit", status: false })
        }
      )
    } else {
      this.subMitObser.next({ submit: "submit", status: false })

      alert("Input every filed.")
    }
  }
}
