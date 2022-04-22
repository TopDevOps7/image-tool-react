import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/dashboard";
import Artwork from "./pages/artwork";
import MockupGenerator from "./pages/mockupGenerator";
import Blanks from "./pages/blanks";
import Settings from "./pages/settings";
import FileUploadPage from "./pages/fileupload";
import NotFound from "./pages/notfound";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/home" component={Home} />
            <Route path="/artwork" component={Artwork} />
            <Route path="/mockupGenerator" component={MockupGenerator} />
            <Route path="/blanks" component={Blanks} />
            <Route path="/settings" component={Settings} />
            <Route path="/fileupload/" component={FileUploadPage} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
