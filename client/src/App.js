import "./App.css";
import { Route, Switch } from "react-router-dom";
import Landingpage from "./components/LandingPage";
import Home from "./components/Home";
import Nav from "./components/Nav";
import AddActivity from "./components/AddActivity";
import Detail from "./components/Detail";

function App() {
  return (
    <div className="App">
      <Route path="/countries" component={Nav} />
      <Switch>
        <Route exact path="/" component={Landingpage} />
        <Route exact path="/countries" component={Home} />
        <Route excat path="/countries/addactivity" component={AddActivity} />
        <Route path="/countries/:id" component={Detail} />
      </Switch>
    </div>
  );
}

export default App;
