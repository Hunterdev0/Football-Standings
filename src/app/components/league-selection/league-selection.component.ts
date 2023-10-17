import { Component, OnInit } from '@angular/core';
import { FootballApiService } from '../../services/football-api.service';
import { Countries } from '../../shared/constants';
import { StandingsRes, StandingsTeam } from '../../models/standings';
@Component({
  selector: 'app-league-selection',
  templateUrl: './league-selection.component.html',
  styleUrls: ['./league-selection.component.css'],
})
export class LeagueSelectionComponent implements OnInit {
  selectedCountry: string;
  currentYear: number;
  standingsteams: StandingsTeam;
  constructor(private footballApiService: FootballApiService) {}
  ngOnInit() {
    if (localStorage.getItem('country')) {
      this.selectedCountry = localStorage.getItem('country');
      localStorage.removeItem('country');
    } else {
      this.selectedCountry = 'england';
    }
    this.selectCountry(this.selectedCountry);
  }
  countriesObjectKeys() {
    return Object.keys(Countries);
  }
  selectCountry(country: string): void {
    this.selectedCountry = country;
    localStorage.setItem('country', this.selectedCountry);
    this.currentYear = new Date().getFullYear();
    this.footballApiService
      .getLeagueStandings(Countries[country], this.currentYear)
      .subscribe(
        (res: StandingsRes) =>
          (this.standingsteams = res.response[0].league.standings[0])
      );
  }
}
