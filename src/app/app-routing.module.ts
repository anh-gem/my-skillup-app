import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SkillManagementComponent } from './components/skill-management/skill-management.component';
import { GoalsManagementComponent } from './components/goals-management/goals-management.component';

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent
  },
  {
    path:'skill-management',
    component:SkillManagementComponent
  },
  {
    path:'goals-management',
    component:GoalsManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
