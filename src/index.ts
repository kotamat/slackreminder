import { WebClient } from "@slack/web-api";
import * as yargs from "yargs";

const argv = yargs.options({
  token: {
    type: "string",
    alias: "t",
    demandOption: true
  },
  channel: {
    type: "string",
    alias: "c",
    demandOption: true
  }
}).argv;

// const token = process.env.SLACK_TOKEN;
// const channelId = process.env.CHANNEL_ID;
const token = argv.token;
const channelId = argv.channel;

const web = new WebClient(token);

(async (): Promise<void> => {
  // fetch all user in this channel
  web.channels.info({ channel: channelId });
})();
