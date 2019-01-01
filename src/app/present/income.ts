export class IncomePresent {
  public dataTotal = []
  constructor() {}
  setData(data) {
    this.dataTotal = data
  }
  totalMonth() {
    return `January 
    February
    March
    April 
    May 
    June 
    July 
    August 
    September 
    October 
    November 
    December `
      .split("\n")
      .map((d, i) => d.split(" ").filter(d => d)[0])
  }
  getMountTotal(year) {
    return this.dataTotal
      .filter(d => new Date(d.create_at).getFullYear() == year.value)
      .map(d => new Date(d.create_at).getMonth())
      .filter((d, i, l) => l.indexOf(d) == i)
      .map(d => {
        return {
          month: this.totalMonth()[d],
          index: d
        }
      })
  }
  calMoney({ incomeInt, outcomeInt, resultTotal }) {
    if (resultTotal < 0) {
      return {
        message: "การเงินของคุณมีบัญหาร้ายแรง",
        class: `dangerI`
      }
    }
  }
  getUniqloYear() {
    return this.dataTotal
      .map(d => new Date(d.create_at).getFullYear())
      .filter((d, i, l) => l.indexOf(d) == i)
  }
  getTotalData() {
    return this.dataTotal
  }
  showDataAllOftheList(): any {
    return this.showDataIsResult(this.dataTotal)
  }
  detailOfList(dataList) {
    return dataList.map(d => d.detail).filter((d, i, l) => l.indexOf(d) === i)
  }

  showDataOfThisMonth(year, month) {
    return this.dataTotal.filter(d => {
      const dateData = new Date(d.create_at)
      return dateData.getFullYear() == year && dateData.getMonth() == month
    })
  }
  showDataOfThisYear(year) {
    return this.dataTotal.filter(d => {
      const dateData = new Date(d.create_at)
      return dateData.getFullYear() == year
    })
  }
  showDataOfThisDate(dateIs) {
    return this.dataTotal.filter(d => {
      const dateData = new Date(d.create_at)
      return dateData.getDate() == dateIs
    })
  }

  showDataIsResult(dataTotal) {
    const incomeList = dataTotal.filter(d => d.type == 1)
    const outcomeList = dataTotal.filter(d => d.type == -1)
    const incomeInt = incomeList.reduce((d, s) => d + s.price, 0)
    const outcomeInt = outcomeList.reduce((d, s) => d + s.price, 0)
    const resultTotal = incomeInt - outcomeInt
    return {
      incomeList,
      outcomeList,
      incomeInt,
      outcomeInt,
      resultTotal
    }
  }
}
