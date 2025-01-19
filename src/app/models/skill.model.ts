export interface Skill {
  id?: number; // Optional since the server generates it
  skillName: string;
  proficiencyLevel: string;
  description: string;
}
