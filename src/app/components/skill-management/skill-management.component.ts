import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { SkillServicesService } from '../../services/skill-services.service';
import { Skill } from '../../models/skill.model';

@Component({
  selector: 'app-skill-management',
  templateUrl: './skill-management.component.html',
  styleUrl: './skill-management.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillManagementComponent implements OnInit {
  skills: any[] = [];
  newSkill: Skill = {
    skillName: '',
    proficiencyLevel: '',
    description: '',
  };
  editMode: boolean = false;
  editingSkillId: any;

  constructor(
    private http: HttpClient,
    private skillService: SkillServicesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.skillService.skills$.subscribe((data) => {
      this.skills = data;
      this.cdr.detectChanges();
    });
    this.loadData();
  }

  loadData() {
    this.skillService.getSkills();
  }

  addSkill() {
    this.skillService.addSkill(this.newSkill).subscribe((addedSkill: Skill) => {
      this.skills.push(addedSkill);
      this.resetNewSkill();
      this.skillService.getSkills();
    });
  }

  editSkill(skill: Skill): void {
    this.newSkill = { ...skill }; // Populate the form with the skill's details
    this.editMode = true; // Enable edit mode
    this.editingSkillId = skill.id; // Set the editing skill ID
  }

  resetNewSkill() {
    this.newSkill = {
      skillName: '',
      proficiencyLevel: '',
      description: '',
    };
    this.editMode = false;
    this.editingSkillId = null;
  }

  deleteSkill(id: number): void {
    this.skillService.deleteSkill(id).subscribe();
    this.skillService.getSkills();
  }

  updateSkill() {
    if (this.editingSkillId !== null) {
      this.skillService
        .updateSkill(this.editingSkillId, this.newSkill)
        .subscribe(() => {
          this.resetNewSkill();
          this.skillService.getSkills(); // Refresh the list
          this.editMode = false;
          this.editingSkillId = null;
        });
    }
  }
}
