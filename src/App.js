import React, {useState} from "react";
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Login from './Login';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {useStateValue} from './StateProvider';

function App() {
  const [{user}, setUser] = useStateValue(false);

  return (
    // BEM naming convention
    <div className="App">
        { !user? (
          <Login/>
        ) : (
          <div className='appBody'> 
          <Router>
              <Sidebar/>
              <Switch>
                <Route path='/rooms/:roomId'>
                  <Chat/>
                </Route>
                <Route path='/'>
                  <Chat/>
                </Route>
              </Switch>
          </Router>
          </div> )
        }
    </div>
  );
}

export default App;
