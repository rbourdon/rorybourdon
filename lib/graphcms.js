import { GraphQLClient } from "graphql-request";

const graphcms = new GraphQLClient(process.env.GRAPHCMS_PROJECT_API, {
  headers: {
    authorization: `Bearer ${process.env.GRAPHCMS_PROD_AUTH_TOKEN}`,
  },
});

//Get all skill basic info
export async function getAllSkills() {
  const data = await graphcms.request(
    `
    query getSkillsBasics() {
      skills {
        title
        slug
      }
      projects {
        title
        skills {
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
}

export async function getAllProjects() {
  const data = await graphcms.request(
    `
    query getProjectsBasics() {
      projects {
        title
        description
        skills {
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
}

//Get a specific subset/ordered list of skills
export async function getSkillList(slug) {
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
}

export async function getSkill(slug) {
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
}

export async function getSkillDetails(slug) {
  const data = await graphcms.request(
    `
  query getSkillDetails($slug: String!) {
    skill(where: {slug: $slug}) {
      title
      slug
      description
      primaryColor {
        css
      }
      image {
        url
      }
      projects {
        title
        description
        skills {
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
}
