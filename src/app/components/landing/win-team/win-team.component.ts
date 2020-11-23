import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges
} from "@angular/core";

@Component({
  selector: "app-win-team",
  templateUrl: "./win-team.component.html",
  styleUrls: ["./win-team.component.scss"]
})
export class WinTeamComponent implements OnInit, OnChanges {
  @Input() winnerTeam: any;

  constructor() {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes.winnerTeam) {
      console.log("winnerTeamChange", changes.winnerTeam);
    }
  }
}
