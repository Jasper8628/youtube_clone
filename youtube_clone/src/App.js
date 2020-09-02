import React from 'react';
import './App.css';
import Header from "./Header";
import SideBar from './SiderBar';
import RecommendedVideos from './RecommendedVideos';
import Drawer from './Drawer';
import SearchPage from './searchPage';
import { CountProvider, useCountContext } from "./utils/GlobalState";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <CountProvider>
      <Router>
        <div className="app">
          <Drawer />
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
