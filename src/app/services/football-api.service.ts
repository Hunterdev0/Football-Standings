import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { FixturesRes } from '../models/fixtures';
import { StandingsRes } from '../models/standings';

@Injectable({ providedIn: 'root' })
export class FootballApiService {
  private cacheStandings: { [url: string]: StandingsRes } = {};
  private cacheFixtures: { [url: string]: FixturesRes } = {};
  constructor(private http: HttpClient) {}
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': environment.apiKey,
    });
  }

  getLeagueStandings(leagueId: number, season: number): Observable<StandingsRes> {
    const headers = this.getHeaders();
    const url = `${environment.apiUrl}/standings?season=${season}&league=${leagueId}`;
    if (this.cacheStandings[url]) {
      return of(this.cacheStandings[url]);
    } else {
      return this.http.get(url, { headers }).pipe(
        tap((data: StandingsRes) => {
          this.cacheStandings[url] = data;
        })
      );
    }
  }
  getTeamFixtures(teamId: number, league: number): Observable<FixturesRes> {
    const headers = this.getHeaders();
    const url = `${environment.apiUrl}/fixtures?team=${teamId}&league=${league}&last=10&status=FT`;
    if (this.cacheFixtures[url]) {
      return of(this.cacheFixtures[url]);
    } else {
      return this.http.get(url, { headers }).pipe(
        tap((data: FixturesRes) => {
          this.cacheFixtures[url] = data;
        })
      );
    }
  }
}
