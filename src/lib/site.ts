export const site = {
  url: "https://andresouza.dev.br",
  name: "André Souza",
  email: "contato@andresouza.dev.br",
  social: {
    linkedin: "https://www.linkedin.com/in/andrefmsouza/",
    github: "https://github.com/andrefmsouza",
  },
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}
