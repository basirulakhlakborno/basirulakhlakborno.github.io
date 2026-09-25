export const socials = [
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61593922261117", icon: "facebook" },
  { label: "Instagram", href: "https://www.instagram.com/basirul.akhlak/", icon: "instagram" },
  { label: "GitHub", href: "https://github.com/basirulakhlakborno", icon: "github" },
] as const;

export type ProjectCategory = "real" | "exploration";

export type Project = {
  title: string;
  image: string;
  alt: string;
  tags: string[];
  category: ProjectCategory;
  full?: boolean;
};

export const projects: Project[] = [
  {
    title: "Ecom - Online Store",
    image: "/images/ecom-raw.png?v=2",
    alt: "Ecom storefront homepage",
    tags: ["Storefront", "Fullstack"],
    category: "real",
  },
  {
    title: "SMM Demo - Social Panel",
    image: "/images/smm-raw.png?v=2",
    alt: "SMM Demo homepage",
    tags: ["Dashboard", "Fullstack"],
    category: "real",
  },
  {
    title: "Anizen - Anime Theme",
    image: "/images/anizen.jpg?v=2",
    alt: "Anizen anime streaming homepage",
    tags: ["Streaming", "Fullstack"],
    category: "real",
    full: true,
  },
  {
    title: "AnimeKai - Anime Theme",
    image: "/images/animekai.jpg",
    alt: "AnimeKai streaming homepage",
    tags: ["Streaming", "Fullstack"],
    category: "real",
    full: true,
  },
  {
    title: "Eastern Newsline - News Site",
    image: "/images/eastern-newsline.jpg",
    alt: "Eastern Newsline homepage",
    tags: ["News", "Fullstack"],
    category: "real",
    full: true,
  },
  {
    title: "Asian Newsline - News Site",
    image: "/images/asian-newsline.jpg",
    alt: "Asian Newsline homepage",
    tags: ["News", "Fullstack"],
    category: "real",
    full: true,
  },
];

export const services = [
  {
    id: "fullstack",
    title: "FULLSTACK",
    body: "From the interface to the API, database, and deploy. One build, ready to ship.",
    image: "/images/service-phones.png",
  },
  {
    id: "frontend",
    title: "FRONTEND",
    body: "Fast interfaces for dashboards, web apps, and the pages that bring people in.",
  },
  {
    id: "backend",
    title: "BACKEND & APIS",
    body: "Auth, data, and APIs that stay clear as the product grows.",
  },
  {
    id: "ship",
    title: "SHIP & SCALE",
    body: "Deploy, monitor, and tighten performance so the product stays fast after launch.",
  },
];

export const jobs = [
  {
    title: "Fullstack Developer",
    detail: "Products, from interface to deploy",
    time: "Now",
    preview: "/images/experience-phones.png",
  },
  {
    title: "Web Applications",
    detail: "Interface, API, and data together",
    time: "Selected",
  },
  {
    title: "Dashboards",
    detail: "Admin tools and data-heavy screens",
    time: "Selected",
  },
  {
    title: "APIs",
    detail: "Auth, integrations, and clean data",
    time: "Selected",
  },
  {
    title: "Launch",
    detail: "Deploy, monitoring, and speed",
    time: "Selected",
  },
];
