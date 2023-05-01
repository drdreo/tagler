import {auth, Gmail} from "https://googleapis.deno.dev/v1/gmail:v1.ts";

// Read the service account key.
const file = Deno.readTextFileSync("./service-account.json");
const googleAuth = auth.fromJSON(JSON.parse(file));
const gmail = new Gmail(googleAuth);

// const MESSAGES_API = 'https://www.googleapis.com/gmail/v1/users/me/messages';
export async function getUnreadMails() {
    const test = await gmail.usersMessagesList('me');
    console.log(test);
}

