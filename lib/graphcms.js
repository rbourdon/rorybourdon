async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(process.env.GRAPHCMS_PROJECT_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GRAPHCMS_PROD_AUTH_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }

  return json.data;
}

//Get all skill basic info
export async function getAllSkillsTitles() {
  const data = await fetchAPI(
    `
    query getSkillsBasics() {
      skills {
        title
      }
    }`,
    {
      preview: false,
      variables: {
        stage: "PUBLISHED",
      },
    }
  );
  return data.skills;
}

//Get all theme titles and icons
export async function getThemeTitlesAndIcons() {
  const data = await fetchAPI(
    `
    query getThemeTitlesAndIcons() {
      themes {
        title
        slug
        icon {
          url
        }
        kits
        {
          title
        }
        boxes
        {
          title
        }
      }
    }`,
    {
      preview: false,
      variables: {
        stage: "PUBLISHED",
        firstf: 20,
      },
    }
  );
  return data.themes;
}
