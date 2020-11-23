import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges
} from "@angular/core";
import { animate, style, transition, trigger } from "@angular/animations";

const TEAM_DEC_DEFAULT =
  "Team Liquid is a world renowed professional gaming organization established in 2000. Since their grassroots beginings as a Battle.net clan and StarCraft community site, they have grown into a multifaceted global company with unparalleled reach in industry.";
const TEAM_IMG_DEFAULT =
  "https://raw.githubusercontent.com/herui912/mainline-test/master/src/app/assets/default-team-img.jpg";

@Component({
  selector: "app-win-team",
  templateUrl: "./win-team.component.html",
  styleUrls: ["./win-team.component.scss"],
  animations: [
    trigger("slideInOut", [
      transition(":enter", [
        style({ transform: "translateX(-100%)" }),
        animate("200ms ease-in", style({ transform: "translateX(0%)" }))
      ]),
      transition(":leave", [
        animate("200ms ease-in", style({ transform: "translateX(-100%)" }))
      ])
    ])
  ]
})
export class WinTeamComponent implements OnInit, OnChanges {
  @Input() winnerTeam: any;
  @Input() errorMsg: string;

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
