import type { MetadataRoute } from "next";
import { listCaseStudySlugs } from "@/data/case-studies";

const BASE_URL = "https://forgn.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const caseStudies: MetadataRoute.Sitemap = listCaseStudySlugs().map(
    (slug) => ({
      url: `${BASE_URL}/realisations/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    })
  );

  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/#realisations`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/#domaines`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/#methode`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/#contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/mentions-legales`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/confidentialite`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/accessibility-statement`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/brief`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...caseStudies,
  ];
}
