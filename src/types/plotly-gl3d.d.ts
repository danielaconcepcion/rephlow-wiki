/**
 * `plotly.js-gl3d-dist-min` ships the same runtime API as `plotly.js`
 * (just trimmed to core + gl3d trace types), but has no types of its own.
 * `@types/plotly.js` already covers the shared API, so this just points
 * the module name at those types instead of writing a second copy.
 */
declare module "plotly.js-gl3d-dist-min" {
  export * from "plotly.js";
}
