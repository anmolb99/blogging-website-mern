import "./App.css";
import NavTop from "./components/Navbar";
import Home from "./components/Home";
import { Route, Switch } from "react-router-dom";
import CreateBlog from "./components/CreateBlog";
import Signin from "./components/Signin";
import DetailView from "./components/DetailView";
import EditBlog from "./components/EditBlog";
import Profile from "./components/Profile";

const App = () => {
  return (
    <>
      <NavTop />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/create_blog" component={CreateBlog} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/detail" component={DetailView} />
        <Route exact path="/edit_blog" component={EditBlog} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </>
  );
};

export default App;
