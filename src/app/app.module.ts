import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";

import { AppComponent } from "./app.component";
import { LandingComponent } from "./components/landing/landing.component";
import { HeaderComponent } from "./components/landing/header/header.component";
import { FindYourTeamComponent } from "./components/landing/find-your-team/find-your-team.component";
import { WinTeamComponent } from "./components/landing/win-team/win-team.component";
import { ApiService } from "./service/api.service";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule
  ],
  declarations: [
    AppComponent,
    WinTeamComponent,
    LandingComponent,
    FindYourTeamComponent,
    HeaderComponent
  ],
  bootstrap: [AppComponent],
  providers: [ApiService]
})
export class AppModule {}
