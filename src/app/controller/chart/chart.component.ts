import { Component, OnInit } from "@angular/core"
import { IncomeInterface } from "src/app/present/income.interface"
import { BehaviorSubject } from "rxjs"
import { incomeData } from "../user/home/home.component"
import { IncomeService } from "src/app/services/income/income.service"

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.css"]
})
export class ChartComponent implements OnInit {
  // dataB: BehaviorSubject<IncomeInterface>
  dataTotal = {
    all: new incomeData(),
    income: []
  }

  constructor(private _incomeS: IncomeService) {}

  ngOnInit() {
    // this.dataB = new BehaviorSubject<IncomeInterface>(this.dataTotal)
    // this.dataB.asObservable().subscribe(d => console.log(d))
    this._incomeS.getData().subscribe(asd => console.log(`test : `, asd))
  }
}
