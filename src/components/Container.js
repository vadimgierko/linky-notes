import { Switch, Route } from "react-router-dom";

import { useTheme } from "../hooks/use-theme";
import { useAuth } from "../hooks/use-auth";
import { useDatabase } from "../hooks/use-database";

import Header from "./Header";
import About from "./About.js";
import SignUpForm from "./SignUpForm.js";
import SignInForm from "./SignInForm.js";
//import Dashboard from "./Dashboard.js";
import ItemsList from "./ItemsList";
import Footer from "./Footer.js";
import AddItemForm from "./AddItemForm";
import UpdateItemForm from "./UpdateItemForm";
import ItemPage from "./ItemPage";

export default function Container() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const database = useDatabase();

  console.log(theme);
  console.log(user);
  console.log(database);

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
          <Route path="/signup">
            <SignUpForm />
          </Route>
          <Route path="/signin">
            <SignInForm />
          </Route>
          {/*<Route path="/dashboard">
            <Dashboard />
          </Route>*/}
          <Route exact path="/items/:itemKey">
            <ItemPage />
          </Route>
          <Route exact path="/items">
            <ItemsList />
          </Route>
          <Route path="/add-item">
            <AddItemForm />
          </Route>
          <Route exact path="/items/update-item/:itemKey">
            <UpdateItemForm />
          </Route>
        </Switch>
        {/*<Footer />*/}
      </div>
    </div>
  );
}
