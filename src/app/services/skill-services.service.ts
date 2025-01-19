import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Skill } from '../models/skill.model';
import { cpuUsage } from 'process';
import { GoalForm } from '../models/goal.model';

@Injectable({
  providedIn: 'root'
})
export class SkillServicesService implements OnInit {
  private apiUrl = 'http://localhost:3000';
  private skillsSubject = new BehaviorSubject<Skill[]>([]);
  skills$ = this.skillsSubject.asObservable();

  private goalsSubject = new BehaviorSubject<GoalForm[]>([]);
  goals$ = this.goalsSubject.asObservable();

  constructor(private http:HttpClient) {}

  ngOnInit(): void {}

  getSkills():void{
    this.http.get<Skill[]>(`${this.apiUrl}/skills`).subscribe((skills)=>{
      this.skillsSubject.next(skills);
    });
  }

  getGoals():void{
    this.http.get<GoalForm[]>(`${this.apiUrl}/goals`).subscribe((goals)=>{
      this.goalsSubject.next(goals);
    })
  }

  addSkill(skill:Skill):Observable<Skill>{
    return this.http.post<Skill>(`${this.apiUrl}/skills`,skill).pipe(
      tap((newSkill)=>{
        const currentSkills = this.skillsSubject.value;
        this.skillsSubject.next([...currentSkills, newSkill]);
      })
    )
  }

  addGoal(goal:GoalForm):Observable<GoalForm>{
    return this.http.post<GoalForm>(`${this.apiUrl}/goals`,goal).pipe(
      tap((newGoal)=>{
        const currentGoals = this.goalsSubject.value;
        this.goalsSubject.next([...currentGoals,newGoal]);
      })
    )
  }

  deleteSkill(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/skills/${id}`).pipe(
      tap((newSkills)=>{
        const currentSkills = this.skillsSubject.value;
        this.skillsSubject.next(currentSkills.filter((skill)=> skill.id !== id))
      })
    )
  }

  updateSkill(id:number,skill:Skill):Observable<Skill>{
    debugger
    return this.http.put<Skill>(`${this.apiUrl}/skills/${id}`, skill).pipe(
      tap((updatedSkill) => {
        const currentSkills = this.skillsSubject.value.map((s) =>
          s.id === id ? updatedSkill : s
        );
        this.skillsSubject.next(currentSkills); // Update the skill in the list
      })
    );
  }

  updateGoal(goal: GoalForm): Observable<GoalForm> {
    debugger
    console.log(`Updating goal with ID: ${goal.id}`);
    const url = `${this.apiUrl}/goals/${goal.id}`
    return this.http.put<GoalForm>(url, goal).pipe(
      tap((updatedGoal) => {
        console.log('Updated goal:', updatedGoal);
        const currentGoals = this.goalsSubject.value.map((s) =>
          s.id === goal.id ? updatedGoal : s
        );
        this.goalsSubject.next(currentGoals);
      })
    );
  }
  
}
