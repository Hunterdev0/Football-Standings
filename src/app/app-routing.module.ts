import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeagueSelectionComponent } from './components/league-selection/league-selection.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TeamDetailComponent } from './components/team-detail/team-detail.component';
const routes: Routes = [
  { path: '', redirectTo: 'leagues', pathMatch: 'full' },
  {
    path: 'leagues',
    children: [
      { path: '', component: LeagueSelectionComponent },
      { path: ':league/:id', component: TeamDetailComponent },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
