import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SkillServicesService } from '../../services/skill-services.service';
import { GoalForm, Task } from '../../models/goal.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-goals-popup',
  templateUrl: './goals-popup.component.html',
  styleUrl: './goals-popup.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class GoalsPopupComponent implements OnInit {
  newStatus: string = '';
  updatedGoal: GoalForm = {
    tasks: [],
  };
  taskName: string = 'Learn Basics about angular';
  length: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { goal: GoalForm },
    private http: HttpClient,
    private skillServices: SkillServicesService,
    public dialogRef: MatDialogRef<GoalsPopupComponent>,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    console.log('Received Goal Data:', this.data.goal);
    if (this.data.goal && this.data.goal.tasks) {
      this.length = this.data.goal.tasks.length; // Access the length property
      console.log(this.length);
      console.log(this.data.goal.tasks);
    }
  }

  updateGoalStatus(id: number, newstatus: string): void {
    debugger;
    const task = this.data.goal.tasks.find((t) => t.id === id); // Find the task by ID
    if (task) {
      task.status = newstatus; // Update the status if the task exists
    } else {
      console.error(`Task with ID ${id} not found.`);
    }
  }

  updateGoal() {
    debugger;
    if (this.data.goal && this.data.goal.id) {
      this.skillServices.updateGoal(this.data.goal).subscribe({
        next: () => {
          this.snackbar.open('Goal updated successfully!', 'Close', {
            duration: 3000, // The message will be visible for 3 seconds
            verticalPosition: 'top', // Position at the top of the screen
            horizontalPosition: 'center', // Center the message horizontally
          });
        },
        error: (err) => {
          this.snackbar.open('Error updating goal!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        },
      });
    }
  }

  closeDialog(): void {
    // Any cleanup or additional logic before closing
    this.dialogRef.close();
  }
}
