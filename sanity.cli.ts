import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "./src/sanity/env";

// Used by `npx sanity <command>` (e.g. dataset management, deploying a
// standalone Studio) — reads the same project ID/dataset as the app.
export default defineCliConfig({ api: { projectId, dataset } });
