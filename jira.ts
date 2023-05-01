// for .env support
import {load} from "std/dotenv/mod.ts";

const env = await load();

// https://<resource>/rest/api/3/search?jql=assignee=currentuser()

const projects = ['COBE', 'ADA'];
const status = ["In Progress"];
const statusJql = status.map(stat => `"${stat}"`).join(",");

const JIRA_API_DOMAIN = env["JIRA_DOMAIN"];
const JIRA_API_USERNAME = env["JIRA_USERNAME"];
const JIRA_API_TOKEN = env["JIRA_API_TOKEN"];
const encodedJiraCredentials = btoa(`${JIRA_API_USERNAME}:${JIRA_API_TOKEN}`);

type AssignedIssues = {
    total: number;
    issues: {
        key: string;
        title: string;
    }
}

export async function getAssignedIssues(currentSprint: boolean): AssignedIssues {
    const JIRA_API_URL = `${JIRA_DOMAIN}/rest/api/3/search?jql=assignee=currentuser() AND project in (${projects.join(",")}) AND status in (${statusJql}) ${currentSprint ? "AND sprint in openSprints()" : ""}`;

    const jsonResponse = await fetch(JIRA_API_URL, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${encodedJiraCredentials}`,
        },
    });
    const jsonData = await jsonResponse.json();
    return {
        total: jsonData.total,
        issues: jsonData.issues.map((issue: any) => {
            return {
                key: issue.key,
                title: issue.fields.summary,
            }
        })
    };
}