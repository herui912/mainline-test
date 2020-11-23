import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges
} from "@angular/core";

const TEAM_DEC_DEFAULT =
  "Team Liquis is a world renowed professional gaming organization established in 2000. Since their grassroots beginings as a Battle.net clan and StarCraft community site, they have grown into a multifaceted global company with unparalleled reach in industry.";
const TEAM_IMG_DEFAULT = "";

@Component({
  selector: "app-win-team",
  templateUrl: "./win-team.component.html",
  styleUrls: ["./win-team.component.scss"]
})
export class WinTeamComponent implements OnInit, OnChanges {
  @Input() winnerTeam: any;

  teamDescDefault: string = TEAM_DEC_DEFAULT;
  teamImgDefault: string = TEAM_IMG_DEFAULT;

  constructor() {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes.winnerTeam) {
      console.log("winnerTeamChange", changes.winnerTeam);
    }
  }
}
