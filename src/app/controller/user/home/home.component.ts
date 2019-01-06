import { Component, OnInit } from "@angular/core"
import { IncomeService } from "src/app/services/income/income.service"
import { AuthService } from "src/app/services/auth/auth.service"
import { IncomePresent } from "src/app/present/income"
import { Router } from "@angular/router"
import { BehaviorSubject, Observable } from "rxjs"
import { IncomeInterface } from "src/app/present/income.interface"
export class incomeData {
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
  dataIncomeBS: BehaviorSubject<IncomeInterface>
  dataIncomeObsv: Observable<IncomeInterface>
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
    this.dataIncomeBS = new BehaviorSubject<IncomeInterface>(this.dataTotal)
    this.dataIncomeObsv = this.dataIncomeBS.asObservable()
    document.getElementById("loader_bk").style.display = "block"
    if (isLogin) {
      const { email } = this.userI.getAuth()
      this.income_list.getData().subscribe(d => {
        this.dataTotal.all = d.all
        this.dataTotal.income = d.income
        const calMoney = this.incomePresent.calMoney(d.all)
        this.messageHandler = calMoney
      })
      this.income_list.getListByEmail(email).subscribe(
        d => {
          if (d.data.data) {
            this.incomePresent.setData(d.data.data)
            this.year = this.incomePresent.getUniqloYear()
            this.income_list.setDataIncome({
              all: this.incomePresent.showDataAllOftheList(),
              income: this.incomePresent.detailOfList(
                this.incomePresent.getTotalData()
              )
            })
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
    this.dataIncomeBS.next({
      all: this.incomePresent.showDataIsResult(dataOfTheYear),
      income: this.incomePresent.detailOfList(dataOfTheYear)
    })
  }
  selectMonth(month) {
    this.dateShow.month = this.incomePresent.totalMonth()[month.value]
    const dataTotal = this.incomePresent.showDataOfThisMonth(
      this.dateShow.year,
      month.value
    )
    this.dateData = this.incomePresent.getDateUniqlo(dataTotal)
    this.income_list.setDataIncome({
      all: this.incomePresent.showDataIsResult(dataTotal),
      income: this.incomePresent.detailOfList(dataTotal)
    })
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
    this.income_list.setDataIncome({
      all: this.incomePresent.showDataIsResult(showDateIs),
      income: this.incomePresent.detailOfList(showDateIs)
    })
  }
  deleteArray(index) {
    alert(index)
  }
  resetSreach() {
    this.month = []
    this.dateData = []
    this.income_list.setDataIncome({
      all: this.incomePresent.showDataAllOftheList(),
      income: this.incomePresent.detailOfList(this.incomePresent.getTotalData())
    })
  }
}
