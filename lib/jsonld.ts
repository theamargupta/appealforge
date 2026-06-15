/**
 * Schema.org JSON-LD builders. Centralized so every page emits consistent, valid
 * structured data (Organization, WebApplication, FAQ, HowTo, Breadcrumb, Article).
 * Rendered via <JsonLd> which handles XSS-safe serialization.
 */

import { author, siteConfig } from "@/config/site";

type Json = Record<string, unknown>;

export function organizationLd(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    founder: { "@type": "Person", name: author.name, url: author.url },
  };
}

export function websiteLd(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  };
}

/** The tool itself is a free WebApplication — strong signal for "free tool" queries. */
export function webApplicationLd(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: siteConfig.name,
    url: siteConfig.url,
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    description: siteConfig.description,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
}

export function faqLd(faqs: { q: string; a: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function howToLd(name: string, steps: { name: string; text: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

export function articleLd(args: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: args.title,
    description: args.description,
    url: `${siteConfig.url}${args.path}`,
    datePublished: args.datePublished,
    author: { "@type": "Person", name: author.name, url: author.url },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  };
}
