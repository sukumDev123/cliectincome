import { Component, OnInit } from "@angular/core"

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    document.getElementById("loader_bk").style.display = "none"
  }
}
