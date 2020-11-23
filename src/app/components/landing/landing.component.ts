import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../service/api.service";
const NOWINNER = "No Winner Yet.";
const TEAMCANTFOUND = "Team can't found.";
const APIERR = "Something wrong with looking for ";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"]
})
export class LandingComponent implements OnInit {
  errorMsg: string = "";
  winnerTeam: any = null;
  constructor(private apiService: ApiService) {}

  ngOnInit() {}

  searchClicked(formatGuid: string) {
    let guid = formatGuid.trim();
    this.errorMsg = "";
    if (guid) {
      this.winnerTeam = undefined;
      this.apiService.getBracketByGuid(guid).subscribe(
        res => {
          const winnerGuid = this.findWinnerGuid(res);
          if (!winnerGuid) {
            this.errorMsg = NOWINNER;
            return;
          }
          this.apiService.getLineupByGuid(winnerGuid).subscribe(
            lineUp => {
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
                teamErr => {
                  this.errorMsg = this.buildErr("team");
                  console.error(teamErr);
                }
              );
            },
            linupErr => {
              this.errorMsg = this.buildErr("lineup");
              console.error(linupErr);
            }
          );
        },
        bracketErr => {
          this.errorMsg = this.buildErr("bracket");
          console.error(bracketErr);
        }
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
  buildErr(name: string): string {
    return APIERR + name + ".";
  }
}
