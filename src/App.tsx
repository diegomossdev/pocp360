import 'react-native-gesture-handler';
import * as React from 'react';
// import migrations from '~/models/migrations';
// import {NativeModules} from 'react-native';
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider';
import {NavigationContainer} from '@react-navigation/native';
import {AppRoutesStack} from '~/router/Router';

import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import {schema} from '~/models/schema';
import Post from '~/models/Post';

const adapter = new SQLiteAdapter({
  dbName: 'WatermelonDemo',
  schema,
  // migrations,
});

const database = new Database({
  adapter,
  modelClasses: [Post],
  actionsEnabled: true,
});

export default function App() {
  return (
    <DatabaseProvider database={database}>
      <NavigationContainer>
        <AppRoutesStack />
      </NavigationContainer>
    </DatabaseProvider>
  );
}
