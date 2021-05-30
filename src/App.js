import React from "react";
import Layout from "./Layout";
import {Route} from "react-router-dom";
import Sorting from "./screens/Sorting";
import {paths} from "./paths";
import PathFinder from "./visualizers/pathfinder";

function App() {
  return (
      <Layout>
          <div className={"w-full"}>
              <Route path={"/"} exact component={Sorting}/>
              <Route path={paths.pathfinder} exact component={PathFinder}/>
          </div>
      </Layout>
  )
}

export default App;
