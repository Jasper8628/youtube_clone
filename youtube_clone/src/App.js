import React from 'react';
import './App.css';
import { CountProvider } from "./utils/GlobalState";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppBar from './components/AppBar';
import Home from './pages/Home';
import Search from './pages/Search';
function App() {
  return (
    <CountProvider>
      <Router>
        <div className="app">
          <AppBar />
            <Switch>
              <Route exact path="/"><Home/></Route>
              <Route exact path="/search/:searchTerm"><Search/></Route>
            </Switch>
        </div>
      </Router>
    </CountProvider>
  );
}

export default App;
