type FeedEntry = {
    uid: string; // A unique identifier for each feed item. UUID format preferred, but not required.
    updateDate: string; // The date indicates freshness of the feed item, and items should be in date order from newest to oldest. Alexa ignores items with a date older than 7 days. A string in ISO 8601 format, YYYY-MM-DDThh:mm:ssZ, specified in UTC.
    titleText: string; // The title of the feed item to display in the Alexa app.
    mainText: string; // The text that Alexa reads to the customer. For audio items, this element is ignored, and can contain an empty string ("").
    redirectionUrl: string; // 	Provides the URL target for the Read More link in the Alexa app.
}

export function getFeedFromJira(issues: AssignedIssues): FeedEntry {

    const titleText = `You have ${issues.total} JIRA tickets.`;
    const mainText = titleText + " " + issues.issues.map(issue => issue.title).join(", ");
    return {
        uid: "urn:uuid:1335c695-cfb8-4ebb-abbd-80da344efa6b",
        updateDate: Date.now(),
        titleText,
        mainText,
        redirectionUrl: "https://www.example.com/path/to/resource/"
    };
}