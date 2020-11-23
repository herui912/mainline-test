import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const Ocp_Apim_Subscription_Key = "38d1bdd39a3646a8809ebbb2e1a6ffd4";
function createHeader(subject: string): any {
  return {
    headers: new HttpHeaders({
      "Ocp-Apim-Subscription-Key": Ocp_Apim_Subscription_Key,
      HydraDomain: subject
    })
  };
}

@Injectable({
  providedIn: "root"
})
export class ApiService {
  baseUrl: string = "https://prodhydraapimgmt.azure-api.net";
  constructor(private http: HttpClient) {}

  getBracketByGuid(formatGuid: string): Observable<any> {
    console.log("getBracketByGuidId", formatGuid);
    const url = `${
      this.baseUrl
    }/single-elim/Format/GetBracket?formatGuid=${formatGuid}`;
    const httpOptions = createHeader("formatGuid");
    return this.http.get<any>(url, httpOptions);
  }
  getLineupByGuid(lineupGuid: string): Observable<any> {
    const url = `${
      this.baseUrl
    }/teammgr/Lineup/GetLineupByGuid?lineupGuid=${lineupGuid}`;
    const httpOptions = createHeader("lineupGuid");
    return this.http.get<any>(url, httpOptions);
  }
  getTeamById(teamId: string): Observable<any> {
    const url = `${this.baseUrl}/teammgr/Team/GetTeamById?teamId=${teamId}`;
    const httpOptions = createHeader("teamId");
    return this.http.get<any>(url, httpOptions);
  }
}
