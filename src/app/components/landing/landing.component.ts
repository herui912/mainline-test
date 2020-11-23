import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../service/api.service";
const NOWINNER = "No Winner Yet.";
const TEAMCANTFOUND = "Team can't found.";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"]
})
export class LandingComponent implements OnInit {
  errorMsg: string = "";
  winnerTeam: any;
  constructor(private apiService: ApiService) {}

  ngOnInit() {}

  searchClicked(formatGuid: string) {
    console.log("searchClicked");
    let guid = formatGuid.trim();
    if (guid) {
      this.apiService.getBracketByGuid(guid).subscribe(
        res => {
          const winnerGuid = this.findWinnerGuid(res);
          if (!winnerGuid) {
            this.errorMsg = NOWINNER;
            return;
          }
          // console.log(winnerGuid, "winnerGuid");
          this.apiService.getLineupByGuid(winnerGuid).subscribe(
            lineUp => {
              console.log("lineup", lineUp);
              const teamId = lineUp.teamId;
              if (teamId === undefined || teamId === null) {
                this.errorMsg = TEAMCANTFOUND;
                return;
              }
              this.apiService.getTeamById(teamId).subscribe(
                team => {
                  this.winnerTeam = team;
                  console.log(team);
                },
                teamErr => {}
              );
            },
            err => {}
          );
        },
        error => {}
      );
    }
  }
  findWinnerGuid(bracket: any): string {
    const numOfRound = bracket.numbOfRounds;
    // find last match round view teams
    let roundView = null;
    if (
      bracket.roundViews[bracket.roundViews.length - 1].roundNumber ===
      numOfRound
    ) {
      roundView = { ...bracket.roundViews[bracket.roundViews.length - 1] };
    } else {
      const filtered = bracket.roundViews.filter(
        rv => rv.roundNumber === numOfRound
      );
      if (!filtered.length) return null;
      roundView = filtered[0];
    }

    if (!roundView.matchViews) return null;
    const finalMatch = roundView.matchViews[0];
    const isAWin = finalMatch.lineupAState === "Win";
    return isAWin ? finalMatch.lineupAGuid : finalMatch.lineupBGuid;
  }
}
