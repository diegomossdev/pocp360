import {synchronize} from '@nozbe/watermelondb/sync';

export default async function syncData(database: any) {
  let latestVersionOfSession = 0;
  let changesOfSession = {};

  const API_URL = 'http://192.168.0.23:3030';

  await synchronize({
    database,
    pullChanges: async ({lastPulledAt}) => {
      const response = await fetch(
        `${API_URL}/sync?lastPulledVersion=${lastPulledAt || 0}`,
      );
      if (!response.ok) {
        throw new Error(await response.text());
      }

      const {changes, latestVersion} = await response.json();
      latestVersionOfSession = latestVersion;
      changesOfSession = changes;

      return {changes, timestamp: latestVersion};
    },
    pushChanges: async ({changes, lastPulledAt}) => {
      console.log('CHANGES', changes);
      const response = await fetch(
        `${API_URL}/sync?lastPulledVersion=${lastPulledAt || 0}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(changes),
        },
      );
      if (!response.ok) {
        throw new Error(await response.text());
      }
      const {changes: changesFromPush, latestVersion} = await response.json();
      latestVersionOfSession = latestVersion;
      changesOfSession = changesFromPush;
    },
    sendCreatedAsUpdated: true,
  });

  await synchronize({
    database,
    pullChanges: async ({lastPulledAt}) => {
      return {changes: changesOfSession, timestamp: latestVersionOfSession};
    },
    pushChanges: async ({changes, lastPulledAt}) => {
      console.log('CAIU AQUI!!!!');
      throw new Error('ERROR!!!....');
    },
  });
}

// https://fahri.id/posts/building-an-offline-first-react-web-app-using-watermelondb-in-phoenix-elixir/
// https://github.com/Nozbe/WatermelonDB/issues/206
