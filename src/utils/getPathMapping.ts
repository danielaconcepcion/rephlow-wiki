import pages, { type Page } from "../pages.ts";

export const getPathMapping = () => {
  return pages.reduce<{ [key: string]: Page }>((map, page) => {
    map[page.path] = page;
    return map;
  }, {});
};
