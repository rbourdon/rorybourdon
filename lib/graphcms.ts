import { GraphQLClient } from "graphql-request";
import type {
  ProjectDetails,
  ProjectSummaryData,
  SkillBasics,
  SkillDetails,
  SkillRef,
} from "@/lib/types";

// Provide a dummy fallback URL to prevent Invalid URL errors on build
// and fallback tokens to prevent exceptions if they are missing
const apiUrl =
  process.env.GRAPHCMS_PROJECT_API ||
  "https://api-us-east-1.hygraph.com/v2/mock/master";
const authToken = process.env.GRAPHCMS_PROD_AUTH_TOKEN || "mock_token";

const graphcms = new GraphQLClient(apiUrl, {
  headers: {
    authorization: `Bearer ${authToken}`,
  },
});

//Get all skill basic info
const hasApi = !!process.env.GRAPHCMS_PROJECT_API;

async function requestWithRetry<T>(
  query: string,
  variables: Record<string, unknown> = {},
  retries = 3,
  delay = 1000,
): Promise<T> {
  try {
    return await graphcms.request(query, variables);
  } catch (error) {
    const status = (error as { response?: { status?: number } }).response
      ?.status;
    if (retries > 0 && status === 429) {
      console.warn(`Rate limited. Retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return requestWithRetry(query, variables, retries - 1, delay * 2);
    }
    throw error;
  }
}

export async function getAllSkills(): Promise<SkillBasics[]> {
  if (!hasApi) return [];
  try {
    const data = await requestWithRetry<{ skills: SkillBasics[] }>(
      `
      query getSkillsBasics() {
        skills {
          title
          slug
        }
        projects {
          slug
          title
          skills {
            slug
            title
          }
        }
      }`,
      {
        preview: false,
        stage: "PUBLISHED",
      },
    );
    return data.skills;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getAllProjects(): Promise<ProjectSummaryData[]> {
  if (!hasApi) return [];
  try {
    const data = await requestWithRetry<{ projects: ProjectSummaryData[] }>(
      `
      query getAllProjects() {
        projects {
          slug
          title
          shortDescription
          skills {
            slug
            title
          }
        }
      }`,
      {
        preview: false,
        stage: "PUBLISHED",
      },
    );
    return data.projects;
  } catch (e) {
    console.error(e);
    return [];
  }
}

//Get a specific subset/ordered list of skills
export async function getSkillList(slug: string): Promise<SkillRef[]> {
  if (!hasApi) return [];
  try {
    const data = await requestWithRetry<{ skillList: { skills: SkillRef[] } }>(
      `
    query getSkillList($slug: String!) {
      skillList(where: {slug: $slug}) {
        skills {
          slug
          title
        }
      }
    }`,
      {
        preview: false,
        stage: "PUBLISHED",
        slug: slug,
      },
    );
    return data.skillList.skills;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getSkill(slug: string): Promise<SkillRef> {
  if (!hasApi) return { title: "Mock", slug: "mock" };
  try {
    const data = await requestWithRetry<{ skill: SkillRef }>(
      `
    query getSkill($slug: String!) {
      skill(where: {slug: $slug}) {
        title
        slug
      }
    }`,
      {
        preview: false,
        stage: "PUBLISHED",
        slug: slug,
      },
    );
    return data.skill;
  } catch (e) {
    console.error(e);
    return { title: "Mock", slug: "mock" };
  }
}

export async function getSkillDetails(slug: string): Promise<SkillDetails> {
  if (!hasApi) return { title: "Mock", slug: "mock", projects: [] };
  try {
    const data = await requestWithRetry<{ skill: SkillDetails }>(
      `
    query getSkillDetails($slug: String!) {
      skill(where: {slug: $slug}) {
        title
        slug
        description
        primaryColor {
          rgba {
            r
            g
            b
            a
          }
        }
        secondaryColor {
          rgba {
            r
            g
            b
            a
          }
        }
        image {
          url
        }
        projects {
          slug
          title
          shortDescription
          skills {
            slug
            title
          }
        }
      }
    }`,
      {
        preview: false,
        stage: "PUBLISHED",
        slug: slug,
      },
    );
    return data.skill;
  } catch (e) {
    console.error(e);
    return { title: "Mock", slug: "mock", projects: [] };
  }
}

export async function getProjectList(
  slug: string,
): Promise<ProjectSummaryData[]> {
  if (!hasApi) return [];
  try {
    const data = await requestWithRetry<{
      projectList: { projects: ProjectSummaryData[] };
    }>(
      `
    query getProjectList($slug: String!) {
      projectList(where: {slug: $slug}) {
        projects {
          slug
          title
          shortDescription
          skills {
            slug
            title
          }
        }
      }
    }`,
      {
        preview: false,
        stage: "PUBLISHED",
        slug: slug,
      },
    );
    return data.projectList.projects;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getProjectDetails(slug: string): Promise<ProjectDetails> {
  if (!hasApi)
    return { title: "Mock", slug: "mock", skills: [], images: [], content: "" };
  try {
    const data = await requestWithRetry<{ project: ProjectDetails }>(
      `
    query getProjectDetails($slug: String!) {
      project(where: {slug: $slug}) {
        title
        slug
        description
        skills {
          title
          description
          slug
        }
        images {
          url
        }
        codeLink
        demoLink
        content
        primaryColor {
          rgba {
            r
            g
            b
            a
          }
        }
        secondaryColor {
          rgba {
            r
            g
            b
            a
          }
        }
      }
    }`,
      {
        preview: false,
        stage: "PUBLISHED",
        slug: slug,
      },
    );
    return data.project;
  } catch (e) {
    console.error(e);
    return { title: "Mock", slug: "mock", skills: [], images: [], content: "" };
  }
}
