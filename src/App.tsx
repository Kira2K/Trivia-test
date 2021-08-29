import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Start from "Screens/start";
import Process from "Screens/process";
import Score from "Screens/score";

import Layout from "components/layout";
import { LayoutThemes } from "components/layout/LayoutTheme";
import { RouteTypes } from "app/RouteTypes";

function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route path={RouteTypes.process}>
          <ProcessScreen />
        </Route>
        <Route path={RouteTypes.score}>
          <ScoreScreen />
        </Route>
        <Route path={RouteTypes.home}>
          <HomeScreen />
        </Route>
      </Switch>
    </Router>
  );

  function HomeScreen(): JSX.Element {
    return (
      <Layout
        bg_color={LayoutThemes.dark}
        closeButton={{ show: false, background: "" }}
        Content={<Start />}
      />
    );
  }
  function ProcessScreen(): JSX.Element {
    return (
      <Layout
        bg_color={LayoutThemes.light}
        closeButton={{ show: true, background: "dark" }}
        Content={<Process />}
      />
    );
  }

  function ScoreScreen(): JSX.Element {
    return (
      <Layout
        bg_color={LayoutThemes.dark}
        closeButton={{ show: true, background: "light" }}
        Content={<Score />}
      />
    );
  }
}

export default App;
