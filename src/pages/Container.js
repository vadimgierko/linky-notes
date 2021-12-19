import { Switch, Route } from "react-router-dom";

import { useTheme } from "../hooks/use-theme";

import Header from "./Header";
import About from "./About.js";
import SignInForm from "./SignInForm.js";
import ItemsPage from "./ItemsPage";
import Footer from "./Footer.js";
import AddItemPage from "./AddItemPage";
import UpdateItemPage from "./UpdateItemPage";
import ItemPage from "./ItemPage";
import TagsList from "./TagsList";
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
          <Route exact path="/items/:itemKey">
            <ItemPage />
          </Route>
          <Route exact path="/items">
            <ItemsPage />
          </Route>
          <Route exact path="/tags">
            <TagsList />
          </Route>
          <Route path="/add-item">
            <AddItemPage />
          </Route>
          <Route exact path="/items/update-item/:itemKey">
            <UpdateItemPage />
          </Route>
          <Route exact path="/add-source">
            <AddSourcePage />
          </Route>
        </Switch>
        <Footer />
      </div>
    </div>
  );
}
