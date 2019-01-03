import { Component, OnInit } from "@angular/core"

@Component({
  selector: "app-err",
  templateUrl: "./err.component.html",
  styleUrls: ["./err.component.css"]
})
export class ErrComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    document.getElementById("loader_bk").style.display = "none"
  }
}
