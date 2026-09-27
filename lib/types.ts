/** Shapes of the Hygraph content the site queries (see lib/graphcms.ts). */

export interface SkillRef {
  slug: string;
  title: string;
}

export interface Color {
  rgba: { r: number; g: number; b: number; a: number };
}

export interface ProjectSummaryData {
  slug: string;
  title: string;
  shortDescription: string;
  skills: SkillRef[];
}

export interface SkillBasics extends SkillRef {}

export interface SkillDetails extends SkillRef {
  description?: string;
  primaryColor?: Color | null;
  secondaryColor?: Color | null;
  image?: { url: string } | null;
  projects: ProjectSummaryData[];
}

export interface ProjectSkill extends SkillRef {
  description?: string;
}

export interface ProjectDetails {
  title: string;
  slug: string;
  description?: string;
  skills: ProjectSkill[];
  images: { url: string }[];
  codeLink?: string | null;
  demoLink?: string | null;
  content: string;
  primaryColor?: Color | null;
  secondaryColor?: Color | null;
}
