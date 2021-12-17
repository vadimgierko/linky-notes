import { Switch, Route } from "react-router-dom";

import { useTheme } from "../hooks/use-theme";

import Header from "./Header";
import About from "./About.js";
import SignInForm from "./SignInForm.js";
import ItemsList from "./ItemsList";
import Footer from "./Footer.js";
import AddItemForm from "./AddItemForm";
import UpdateItemForm from "./UpdateItemForm";
import ItemPage from "./ItemPage";
import TagsList from "./TagsList";

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
        className="container-sm"
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
            <ItemsList />
          </Route>
          <Route exact path="/tags">
            <TagsList />
          </Route>
          <Route path="/add-item">
            <AddItemForm />
          </Route>
          <Route exact path="/items/update-item/:itemKey">
            <UpdateItemForm />
          </Route>
        </Switch>
        <Footer />
      </div>
    </div>
  );
}
