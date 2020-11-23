import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-find-your-team",
  templateUrl: "./find-your-team.component.html",
  styleUrls: ["./find-your-team.component.scss"]
})
export class FindYourTeamComponent implements OnInit {
  title: string = "Find your Team.";
  bullets: string[] = [
    "Join over 350,000 gamers in just minutes",
    "Find Player and teams for the latest competitions",
    "Call of message other users for free"
  ];
  searchVal: string = "531e5380-e501-460f-9b2c-e7d11564c902";

  @Output() searchClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  search() {
    this.searchClicked.emit(this.searchVal);
  }
}
