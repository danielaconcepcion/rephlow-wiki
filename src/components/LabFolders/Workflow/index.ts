export { WorkflowRun } from "./WorkflowRun";
export type { WorkflowRunProps, WorkflowStageDef } from "./WorkflowRun";
export type { GlyphId } from "./glyphs";

import type { WorkflowRunProps } from "./WorkflowRun";

/** What a data file supplies: everything but the id, which the page
 * assigns from the block or sub-block the run belongs to. */
export type WorkflowSpec = Omit<WorkflowRunProps, "id">;
