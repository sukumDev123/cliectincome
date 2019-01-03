import { Component, OnInit } from "@angular/core"
import { IncomeService } from "src/app/services/income/income.service"
import { AuthService } from "src/app/services/auth/auth.service"
import { IncomePresent } from "src/app/present/income"
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
  constructor(private income_list: IncomeService, private userI: AuthService) {}

  ngOnInit() {
    const isLogin = this.userI.isLogin()
    this.incomePresent = new IncomePresent()
    if (isLogin) {
      const { email } = this.userI.getAuth()
      this.income_list.getListByEmail(email).subscribe(
        d => {
          this.incomePresent.setData(d.data.data)
          this.year = this.incomePresent.getUniqloYear()
          this.dataTotal.all = this.incomePresent.showDataAllOftheList()
          const calMoney = this.incomePresent.calMoney(this.dataTotal.all)
          this.messageHandler = calMoney
          // console.log(JSON.stringify(calMoney))
          this.dataTotal.income = this.incomePresent.detailOfList(
            this.incomePresent.getTotalData()
          )
          // console.log(this.incomePresent.getTotalData())
        },

        err => console.log(err)
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
          index: d.index
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
