import React from 'react';
import Currency from './Components/Currency';

import classes from './App.module.css'
import Logo from './Components/Logo';

function App() {
  return (
    <div className={classes.App}>
      <Logo />
      <Currency />
    </div>  
  );
}

export default App;
