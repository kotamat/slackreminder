import { WebClient, WebAPICallOptions } from "@slack/web-api";
import * as yargs from "yargs";

type ChannelInfo = {
  channel: {
    members: string[];
  };
};
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

//type guards
function hasChannelInfo(res: WebAPICallOptions): res is ChannelInfo {
  return (res as ChannelInfo).channel !== undefined;
}

(async (): Promise<void> => {
  // fetch all user in this channel
  const info = await web.channels.info({ channel: channelId });
  if (hasChannelInfo(info)) {
    const members = info.channel.members;
    console.log(members);
  }
})();
