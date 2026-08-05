import { GraphQLClient } from "graphql-request";

// Provide a dummy fallback URL to prevent Invalid URL errors on build
// and fallback tokens to prevent exceptions if they are missing
const apiUrl = process.env.GRAPHCMS_PROJECT_API || "https://api-us-east-1.hygraph.com/v2/mock/master";
const authToken = process.env.GRAPHCMS_PROD_AUTH_TOKEN || "mock_token";

const graphcms = new GraphQLClient(apiUrl, {
  headers: {
    authorization: `Bearer ${authToken}`,
  },
});

//Get all skill basic info
const hasApi = !!process.env.GRAPHCMS_PROJECT_API;

export async function getAllSkills() {
  if (!hasApi) return [];
  try {
    const data = await graphcms.request(
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
      }
    );
    return data.skills;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getAllProjects() {
  if (!hasApi) return [];
  try {
    const data = await graphcms.request(
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
      }
    );
    return data.projects;
  } catch (e) {
    console.error(e);
    return [];
  }
}

//Get a specific subset/ordered list of skills
export async function getSkillList(slug) {
  if (!hasApi) return [];
  try {
    const data = await graphcms.request(
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
      }
    );
    return data.skillList.skills;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getSkill(slug) {
  if (!hasApi) return { title: 'Mock', slug: 'mock' };
  try {
    const data = await graphcms.request(
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
      }
    );
    return data.skill;
  } catch (e) {
    console.error(e);
    return { title: 'Mock', slug: 'mock' };
  }
}

export async function getSkillDetails(slug) {
  if (!hasApi) return { title: 'Mock', slug: 'mock', projects: [] };
  try {
    const data = await graphcms.request(
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
      }
    );
    return data.skill;
  } catch (e) {
    console.error(e);
    return { title: 'Mock', slug: 'mock', projects: [] };
  }
}

export async function getProjectList(slug) {
  if (!hasApi) return [];
  try {
    const data = await graphcms.request(
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
      }
    );
    return data.projectList.projects;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getProjectDetails(slug) {
  if (!hasApi) return { title: 'Mock', slug: 'mock', skills: [], images: [], content: '' };
  try {
    const data = await graphcms.request(
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
      }
    );
    return data.project;
  } catch (e) {
    console.error(e);
    return { title: 'Mock', slug: 'mock', skills: [], images: [], content: '' };
  }
}
