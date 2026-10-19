// getPathMapping is intentionally NOT re-exported here: it imports
// pages.ts, which imports every page component in src/contents — anything
// that imports it transitively pulls in the whole app. App.tsx (its only
// consumer) imports it directly from "./getPathMapping" instead, so this
// barrel stays cheap for leaf consumers (e.g. Footer's `asset` import).
export * from "./stringToSlug";
export * from "./asset";
