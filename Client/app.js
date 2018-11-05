import React from 'react';

import Routes from './routes';
import { NavBar } from './Components';

/*
* Entry point into Components
*/

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes />
    </div>
  );
};

export default App;
