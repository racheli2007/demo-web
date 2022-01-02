import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import { Subjects } from './components/subjects/subjects';
import { Items } from './components/items/items';
import { Details } from './components/items/details';

function App() {
  return (
    <Router>
    <Switch>
    <Route exact path="/Subjects" component={Subjects} />
    <Route exact path="/boys" component={Items} />
    <Route exact path="/girls" component={Items} />
    <Route exact path="/babyGirls" component={Items} />
    <Route exact path="/babyBoys" component={Items} />
    <Route exact path="/newborn" component={Items} />
    <Route exact path="/details" component={Details} />
    <Route exact path="/" component={Subjects} />
{/* 
      <Route
        path={'/subjects'}
        element={<Subjects />} /> */}
            <Route
        path={'/'}
        component={App} />
      {/* <Route path="/qrCode/:hotlineId"  render={(props) => (<QrCode {...props} />)} /> */}
      {/* <Route path="/" render={(props) => (<Page title="Login"> <Login {...props} /></Page>)} /> */}
    </Switch>
  </Router>
  );
}

export default App;
