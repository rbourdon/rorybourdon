import type { MetadataRoute } from "next";
import { getSitemapEntries } from "@/lib/graphcms";
import { siteUrl } from "@/lib/site";

// Built once at build time, like the pages it lists. Project and skill pages
// come from the same Hygraph lists their getStaticPaths use.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { projects, skills } = await getSitemapEntries();

  return [
    { url: siteUrl },
    { url: `${siteUrl}/projects` },
    { url: `${siteUrl}/skills` },
    { url: `${siteUrl}/contact` },
    ...projects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: project.updatedAt,
    })),
    ...skills.map((skill) => ({
      url: `${siteUrl}/skills/${skill.slug}`,
      lastModified: skill.updatedAt,
    })),
  ];
}
