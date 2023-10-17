import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeagueSelectionComponent } from './components/league-selection/league-selection.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TeamDetailComponent } from './components/team-detail/team-detail.component';

@NgModule({
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  declarations: [
    AppComponent,
    LeagueSelectionComponent,
    TeamDetailComponent,
    PageNotFoundComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
