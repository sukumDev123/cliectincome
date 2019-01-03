import { Component, OnInit } from "@angular/core"

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  constructor() {}
  getById(headerforAdmin) {
    return document.getElementById(headerforAdmin)
  }
  ngOnInit() {}
  listShow() {
    const showNav = this.getById("headerforAdmin")

    switch (showNav.style.display) {
      case "block":
        showNav.style.display = "none"
        break
      case "none":
        showNav.style.display = "block"
        break
      default:
        showNav.style.display = "block"
        break
    }
  }
}
