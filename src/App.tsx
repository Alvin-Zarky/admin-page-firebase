import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import { Router } from './router';
import Dashboard from './views/dashboard';
import SignIn from './views/sign-in';
import SignUp from './views/sign-up';
import useSelectorHook from './hooks/useSelectorHook';
import NotFound from './views/not-found';
import AddCategory from './views/add-category';
import AddContent from './views/add-content';
import AddBox from './views/add-box';
import './App.css';
import LiveSearchCategory from './views/live-search-category';
import LiveSearchContent from './views/live-search-content';

function App() {

  const {user} = useSelectorHook(state => state.authSignIn)
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={Router.HOME}>
          {user && <Dashboard />}
          {!user && <Redirect to={Router.SIGN_IN} />}
        </Route>
        <Route path={Router.SIGN_IN}>
          {!user && <SignIn />}
          {user && <Redirect to={Router.HOME} />}
          <SignIn />
        </Route>
        <Route path={Router.SIGN_UP}>
          {!user && <SignUp />}
          {user && <Redirect to={Router.HOME} />}
        </Route>
        <Route exact path={Router.ADD_CATEGORY}>
          {!user && <Redirect to={Router.SIGN_IN} />}
          {user && <AddCategory />}
        </Route>
        <Route path={`${Router.ADD_CATEGORY}/search/:keyword`}>
          {!user && <Redirect to={Router.SIGN_IN} />}
          {user && <LiveSearchCategory />}
        </Route>
        <Route exact path={Router.ADD_CONTENT}>
          {!user && <Redirect to={Router.SIGN_IN} />}
          {user && <AddContent />}
        </Route>
        <Route path={`${Router.ADD_CONTENT}/search/:keyword`}>
          {!user && <Redirect to={Router.SIGN_IN} />}
          {user && <LiveSearchContent />}
        </Route>
        <Route path={Router.ADD_BOX}>
          {!user && <Redirect to={Router.SIGN_IN} />}
          {user && <AddBox />}
        </Route>
        <Route path={Router.NOT_FOUND}>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
