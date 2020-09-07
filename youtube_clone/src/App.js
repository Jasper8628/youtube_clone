import React from 'react';
import './App.css';
import Header from "./Header";
import SideBar from './components/SiderBar';
import RecommendedVideos from './components/RecommendedVideos';
import SearchPage from './components/searchPage';
import { CountProvider, useCountContext } from "./utils/GlobalState";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppBar from './components/AppBar';

function App() {
  return (
    <CountProvider>
      <Router>
        <div className="app">
          <AppBar />
          <div className="app__page">
            <Switch>
              <Route exact path="/">
                <SideBar/>
                <RecommendedVideos />
              </Route>
              <Route exact path="/search/:searchTerm">
                <SideBar/>
                <SearchPage />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </CountProvider>
  );
}

export default App;
