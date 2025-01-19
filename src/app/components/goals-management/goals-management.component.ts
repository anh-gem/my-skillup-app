import { Component, OnInit } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SkillServicesService } from '../../services/skill-services.service';
import { GoalForm } from '../../models/goal.model';
import { HttpClient } from '@angular/common/http';
import { GoalsPopupComponent } from '../goals-popup/goals-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-goals-management',
  templateUrl: './goals-management.component.html',
  styleUrl: './goals-management.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class GoalsManagementComponent implements OnInit {
  goals: any[] = [];
  skills: any[] = [];
  selectedSkill: string = '';
  showInputBox: boolean = false;
  newTaskName: string = '';
  formData: GoalForm = {
    skill: '',
    deadline: new Date(),
    tasks: [],
  };
  taskCounter: number = 0;
  nextGoalId: number = 1;
  isSaved:boolean = false
  isLoaded:boolean = true;

  constructor(
    private skillService: SkillServicesService,
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.skillService.goals$.subscribe((data) => {
      this.goals = data;
    });
    this.skillService.skills$.subscribe((data) => {
      this.skills = data;
    });
    this.skillService.getGoals();
    this.skillService.getSkills();
  }

  addGoal() {
    const newGoal: GoalForm = {
      ...this.formData,
      id: Date.now(), // Assign a unique ID
    };
    this.skillService
      .addGoal(newGoal)
      .subscribe((addedGoal: GoalForm) => {
        this.goals.push(addedGoal);
        this.onReset();
      });
    this.isSaved = true;
    window.location.reload();
  }

  addTask(): void {
    
    this.formData.tasks.push({
      id: Date.now(),
      label: this.newTaskName,
      checked: false,
      status:'pending',
    });
    this.newTaskName = ''; // Reset the input box value
    this.showInputBox = false;
  }

  onReset() {
    this.formData = {
      skill: '',
      deadline: new Date(),
      tasks: [],
    };
    this.taskCounter = 0;
  }

  blockEnter(event: Event): void {
    event.preventDefault(); // Block the Enter key
  }

  openPopup(id:number): void {   
    const goal =  this.goals.find((g)=>g.id === id);

    const dialogRef = this.dialog.open(GoalsPopupComponent, {
      data: { goal}, // Optional
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed', result);
    });
  }
}
