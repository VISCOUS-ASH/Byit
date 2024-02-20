// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginForm} />
        <ProtectedRoute path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
