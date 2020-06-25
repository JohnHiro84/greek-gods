import React from "react";
import {Route, Switch } from "react-router-dom";

import GodsList from "./gods/GodsList";
import GodDetail from "./gods/GodDetail";

import GodCreate from "./create/GodCreate";
import EmblemCreate from "./create/EmblemCreate";
import AbodeCreate from "./create/AbodeCreate";
import Create from "./create/Create";

import Nav from "./Nav";


const App = () => {
  return (
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={GodsList} />
        <Route exact path="/godCreate" component={GodCreate} />
        <Route exact path="/emblemCreate" component={EmblemCreate} />
        <Route exact path="/abodeCreate" component={AbodeCreate} />
        <Route exact path="/new" component={Create} />
        <Route exact path="/gods/:id" component={GodDetail} />
      </Switch>
    </div>
  );
};



export default App;
