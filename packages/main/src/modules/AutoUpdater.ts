import {AppModule} from '../AppModule.js';
import electronUpdater, {type AppUpdater, type Logger} from 'electron-updater';
import {app} from 'electron';
type DownloadNotification = Parameters<AppUpdater['checkForUpdatesAndNotify']>[0];

export class AutoUpdater implements AppModule {

  readonly #logger: Logger | null;
  readonly #notification: DownloadNotification;
  readonly #updateServer: string;

  constructor(
    {
      logger = null,
      downloadNotification = undefined,
      updateServer = 'https://api.kyle.decentparadox.me',
    }:
      {
        logger?: Logger | null | undefined,
        downloadNotification?: DownloadNotification,
        updateServer?: string
      } = {},
  ) {
    this.#logger = logger;
    this.#notification = downloadNotification;
    this.#updateServer = updateServer;
  }

  async enable(): Promise<void> {
    await this.runAutoUpdater();
  }

  getAutoUpdater(): AppUpdater {
    const {autoUpdater} = electronUpdater;
    
    // Configure update server URL for Hazel
    const feedURL = `${this.#updateServer}/update/${process.platform}/${app.getVersion()}`;
    autoUpdater.setFeedURL(feedURL);
    
    return autoUpdater;
  }

  async runAutoUpdater() {
    const updater = this.getAutoUpdater();
    try {
      updater.logger = this.#logger || null;
      updater.fullChangelog = true;

      if (import.meta.env.VITE_DISTRIBUTION_CHANNEL) {
        updater.channel = import.meta.env.VITE_DISTRIBUTION_CHANNEL;
      }

      return await updater.checkForUpdatesAndNotify(this.#notification);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('No published versions')) {
          return null;
        }
      }

      throw error;
    }
  }
}


export function autoUpdater(...args: ConstructorParameters<typeof AutoUpdater>) {
  return new AutoUpdater(...args);
}
