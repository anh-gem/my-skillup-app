export interface GoalForm {
  id?:number;
  skill?: string; // Selected skill
  deadline?: Date; // Deadline for the skill
  tasks: Task[]; // List of tasks
}

export interface Task {
  id: number;
  label: string;
  checked: boolean;
  status:string;
}



