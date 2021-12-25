import { Switch, Route } from "react-router-dom";

import { useTheme } from "../hooks/use-theme";

import Header from "../components/organisms/Header";
import About from "./About.js";
import SignInForm from "./SignInForm.js";
import ItemsPage from "./ItemsPage";
import Footer from "../components/organisms/Footer.js";
import AddItemPage from "./AddItemPage";
import UpdateItemPage from "./UpdateItemPage";
import ItemPage from "./ItemPage";
import TagsPage from "./TagsPage";
import AddSourcePage from "./AddSourcePage";

export default function Container() {
  const { theme } = useTheme();

  return (
    <div
      className="container-fluid"
      style={{
        background: theme.background,
        color: theme.color,
        minHeight: "100vh"
      }}
    >
      <Header />
      <div
        className="container"
        style={{
          background: theme.background,
          color: theme.color,
          paddingTop: 70
        }}
      >
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/signin">
            <SignInForm />
          </Route>
          <Route exact path="/notes/:itemKey">
            <ItemPage />
          </Route>
          <Route path="/tags">
            <TagsPage />
          </Route>
          <Route path="/add-note">
            <AddItemPage />
          </Route>
          <Route exact path="/notes/update-note/:itemKey">
            <UpdateItemPage />
          </Route>
          <Route exact path="/add-source">
            <AddSourcePage />
          </Route>
          <Route path="/">
            <ItemsPage />
          </Route>
        </Switch>
        <Footer />
      </div>
    </div>
  );
}
