import { Component, OnInit } from "@angular/core"
import { IncomeService } from "src/app/services/income/income.service"
import { AuthService } from "src/app/services/auth/auth.service"
import { IncomePresent } from "src/app/present/income"
import { Router } from "@angular/router"
class incomeData {
  incomeList = []
  incomeInt = 0
  outcomeList = []
  outcomeInt = 0

  resultTotal = 0
  constructor(
    incomeList = [],
    incomeInt = 0,
    outcomeList = [],
    outcomeInt = 0,
    resultTotal = 0
  ) {
    this.incomeList = incomeList
    this.incomeInt = incomeInt
    this.outcomeList = outcomeList
    this.outcomeInt = outcomeInt
    this.resultTotal = resultTotal
  }
}

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  dataIncome = []
  month = []
  year = []
  showOntable = []
  messageHandler = {
    message: ``,
    class: ``
  }
  dataTotal = {
    all: new incomeData(),
    income: []
  }
  dateShow = {
    year: ``,
    month: ``,
    date: ``
  }
  dateData = []
  incomePresent: IncomePresent
  constructor(
    private income_list: IncomeService,
    private userI: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const isLogin = this.userI.isLogin()
    this.incomePresent = new IncomePresent()
    document.getElementById("loader_bk").style.display = "block"

    if (isLogin) {
      const { email } = this.userI.getAuth()
      this.income_list.getListByEmail(email).subscribe(
        d => {
          if (d.data.data) {
            this.incomePresent.setData(d.data.data)
            this.year = this.incomePresent.getUniqloYear()
            this.dataTotal.all = this.incomePresent.showDataAllOftheList()
            const calMoney = this.incomePresent.calMoney(this.dataTotal.all)
            this.messageHandler = calMoney


            this.dataTotal.income = this.incomePresent.detailOfList(
              this.incomePresent.getTotalData()
            )
          }
          document.getElementById("loader_bk").style.display = "none"
        },

        err => {
          const message = err.error.message
            ? err.error.message
            : "Server Error or Server Close."
          alert(message)

          if (err.error.status == 401) {
            localStorage.removeItem("user")
          } else if (err.status == 0 || err.status == 500) {
            this.router.navigate(["/serverError"])
          }
        }
      )
    }
  }
  seletedYear(year) {
    this.dateShow.year = year.value
    this.month = this.incomePresent.getMountTotal(year)
    const dataOfTheYear = this.incomePresent.showDataOfThisYear(year.value)
    this.dataTotal.all = this.incomePresent.showDataIsResult(dataOfTheYear)
    this.dataTotal.income = this.incomePresent.detailOfList(dataOfTheYear)
  }
  selectMonth(month) {
    this.dateShow.month = this.incomePresent.totalMonth()[month.value]
    const dataTotal = this.incomePresent.showDataOfThisMonth(
      this.dateShow.year,
      month.value
    )
    // alert(JSON.stringify(dataTotal))
    this.dataTotal.all = this.incomePresent.showDataIsResult(dataTotal)
    this.dataTotal.income = this.incomePresent.detailOfList(dataTotal)
    this.dateData = this.incomePresent.getDateUniqlo(dataTotal)
  }
  showTableOfDetail(detail) {
    // console.log(detail)
    this.showOntable = this.incomePresent
      .getTotalData()
      .filter(d => d.detail == detail)
      .map(d => {
        const dateIs = new Date(d.create_at)
        return {
          price: d.price,
          type: d.type,
          create_at: `${dateIs.getDate()} ${
            this.incomePresent.totalMonth()[dateIs.getMonth()]
          } ${dateIs.getFullYear()}`,
          index: d.index,
          detail: d.detail
        }
      })
  }
  seletetedByDate(thisDate) {
    const dateIs = thisDate.value
    this.dateShow.date = dateIs
    const showDateIs = this.incomePresent.showDataOfThisDate(dateIs)
    this.dataTotal.all = this.incomePresent.showDataIsResult(showDateIs)
    this.dataTotal.income = this.incomePresent.detailOfList(showDateIs)
  }
  deleteArray(index) {
    alert(index)
  }
}
