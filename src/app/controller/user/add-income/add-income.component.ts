import { Component, OnInit } from "@angular/core"
import { IncomeService } from "src/app/services/income/income.service"
import { AuthService } from "src/app/services/auth/auth.service"
import { Observable, observable } from "rxjs"
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

  submit_ = "submit"
  submit_load = false
  constructor(private _incomeS: IncomeService, private _auth: AuthService) {}

  ngOnInit() {
    document.getElementById("loader_bk").style.display = "none"

    if (this._auth.isLogin()) {
      const email = this._auth.getAuth().email
      this.incomeData.email = email
    }
  }
  addIncome() {
    this.submit_load = true
    this.submit_ = "add to database..."
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
            this.submit_load = false
            this.submit_ = "submit"
          }
        },
        e => {
          alert(JSON.stringify(e))
          this.submit_load = false
          this.submit_ = "submit"
        }
      )
    } else {
      this.submit_load = false
      this.submit_ = "submit"
      alert("Input every filed.")
    }
  }
}
