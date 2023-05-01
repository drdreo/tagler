import {getAssignedIssues} from "./jira.ts";

const currentAssignedIssues = await getAssignedIssues(true);

console.log(currentAssignedIssues);
