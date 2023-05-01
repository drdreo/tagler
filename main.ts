import "https://deno.land/std@0.185.0/dotenv/load.ts";
import {serve} from "https://deno.land/std@0.177.0/http/server.ts";

import {getAssignedIssues} from "./jira.ts";

serve(async (req: Request) => {
    const currentAssignedIssues = await getAssignedIssues(true);
    return Response.json(currentAssignedIssues)
});
