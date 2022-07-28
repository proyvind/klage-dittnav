import path from 'path';
import { performance } from 'perf_hooks';
import { injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr';
import { frontendDistDirectoryPath } from '../config/config';
import { ENVIRONMENT, isDeployedToProd } from '../config/env';
import { VERSION } from '../config/version';
import { getLogger } from '../logger';
import { EmojiIcons, sendToSlack } from '../slack';

const log = getLogger('index-file');

class IndexFile {
  private readonly INDEX_HTML_PATH = path.join(frontendDistDirectoryPath, 'index.html');

  private _isReady = false;
  public get isReady() {
    return this._isReady;
  }

  private _indexFile = '';
  public get indexFile() {
    return this._indexFile;
  }

  constructor() {
    this.init();
  }

  private async init() {
    try {
      await this.generateFile();
      this.setReady();
      setInterval(this.generateFile, 60 * 1000);
    } catch (e) {
      if (e instanceof Error) {
        log.error({ error: e, msg: 'Failed to generate index file' });
        sendToSlack(`Error when generating index file: ${e.message}`, EmojiIcons.Scream);
      }

      this.init();
    }
  }

  private setReady = () => {
    this._isReady = true;
  };

  private generateFile = async (): Promise<IndexFile> => {
    try {
      const start = performance.now();

      const indexHtml = await injectDecoratorServerSide({
        env: isDeployedToProd ? 'prod' : 'dev',
        filePath: this.INDEX_HTML_PATH,
        simple: true,
        chatbot: true,
        redirectToApp: false,
        logoutUrl: '/oauth2/logout',
      });

      const end = performance.now();

      this._indexFile = indexHtml.replace('{{ENVIRONMENT}}', ENVIRONMENT).replace('{{VERSION}}', VERSION);

      log.debug({
        msg: `Successfully updated index.html with Dekoratøren and variables.`,
        data: { responseTime: Math.round(end - start) },
      });
    } catch (e) {
      if (e instanceof Error) {
        throw e;
      } else {
        throw new Error('Unknown error.');
      }
    }

    return this;
  };
}

export const indexFile = new IndexFile();
