import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Fixture,
  FixturesRes,
  Goals,
  League,
  Score,
  Team,
} from '../../models/fixtures';
import { FootballApiService } from '../../services/football-api.service';
import { Countries } from '../../shared/constants';
@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css'],
})
export class TeamDetailComponent implements OnInit {
  lastTenResults: {
    fixture: Fixture;
    league: League;
    teams: {
      home: Team;
      away: Team;
    };
    goals: Goals;
    score: Score;
  }[];
  constructor(
    private route: ActivatedRoute,
    private footballApiService: FootballApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: { id: number; league: string }) => {
      this.getTeamFixtures(params.id, params.league);
    });
  }

  getTeamFixtures(teamId: number, league: string) {
    this.footballApiService
      .getTeamFixtures(teamId, Countries[league])
      .subscribe((res: FixturesRes) => (this.lastTenResults = res.response));
  }
  back() {
    this.router.navigateByUrl('/leagues');
  }
}
