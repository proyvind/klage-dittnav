import fetch from 'node-fetch';
import { slack } from './config/config';
import { ENVIRONMENT, isDeployed } from './config/env';
import { getLogger } from './logger';

const log = getLogger('slack');

export enum EmojiIcons {
  StartStruck = ':star-struck:',
  Scream = ':scream:',
}

const { url, channel, messagePrefix } = slack;
const isConfigured = typeof url === 'string' && url.length !== 0;

export const sendToSlack = async (message: string, icon_emoji: EmojiIcons) => {
  const text = `[${ENVIRONMENT}] ${messagePrefix} ${message}`;

  if (!isDeployed || !isConfigured) {
    return;
  }

  const body = JSON.stringify({
    channel,
    text,
    icon_emoji,
  });

  return fetch(url, {
    method: 'POST',
    body,
  }).catch((error: unknown) => {
    log.error({ error, msg: `Failed to send message to Slack. Message: '${text}'` });
  });
};
