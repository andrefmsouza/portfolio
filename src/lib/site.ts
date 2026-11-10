export const site = {
  url: "https://andresouza.dev.br",
  name: "André Souza",
  email: "contato@andresouza.dev.br",
  /** Ano em que comecei a trabalhar com software — base do "{years}" nos textos */
  careerStartYear: 2013,
  social: {
    linkedin: "https://www.linkedin.com/in/andrefmsouza/",
    github: "https://github.com/andrefmsouza",
  },
} as const;

/** Anos de carreira: ano atual menos o ano de início */
export function yearsOfExperience(now = new Date()) {
  return now.getFullYear() - site.careerStartYear;
}

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}
