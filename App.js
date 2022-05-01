import React from 'react';
import { StatusBar } from 'react-native';

import Routes from './src/Routes';
import Theme from './src/Theme';
import ScheduleProvider from './src/Context';

const App = () => (
  <>
    <ScheduleProvider>
      <Routes />
    </ScheduleProvider>
    <StatusBar backgroundColor={Theme.background} />
  </>
);

export default App;
