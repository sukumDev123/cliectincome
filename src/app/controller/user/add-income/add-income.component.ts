import { Component, OnInit } from "@angular/core"
import { IncomeService } from "src/app/services/income/income.service"
import { AuthService } from "src/app/services/auth/auth.service"

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
  constructor(private _incomeS: IncomeService, private _auth: AuthService) {}

  ngOnInit() {
    if (this._auth.isLogin()) {
      const email = this._auth.getAuth().email
      this.incomeData.email = email
    }
  }
  addIncome() {
    if (
      this.incomeData.detail &&
      this.incomeData.price &&
      this.incomeData.type
    ) {
      this._incomeS.addNewIncome(this.incomeData).subscribe(
        d => {
          if (d.status == 200) {
            alert(d.message)
          }
        },
        e => {
          alert(JSON.stringify(e))
        }
      )
    } else {
      alert("Input every filed.")
    }
  }
}
