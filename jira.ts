// https://<resource>/rest/api/3/search?jql=assignee=currentuser()

const projects = ['COBE', 'ADA'];
const status = ["In Progress"];
const statusJql = status.map(stat => `"${stat}"`).join(",");

const JIRA_DOMAIN = Deno.env.get("JIRA_DOMAIN");
const JIRA_USERNAME = Deno.env.get("JIRA_USERNAME");
const JIRA_API_TOKEN = Deno.env.get("JIRA_API_TOKEN");
const encodedJiraCredentials = btoa(`${JIRA_USERNAME}:${JIRA_API_TOKEN}`);

export type AssignedIssues = {
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