import { useTheme } from "../hooks/use-theme";

export default function About() {
  const { theme } = useTheme();
  
  return (
    <div
      style={{ background: theme.background, color: theme.color }}
    >
      <p>
        This is the basic template application for easy & quick start a new
        complete full-stack web app project.
      </p>
      <h3>This template includes the following features (at the moment):</h3>
      <ul>
        <li>Routing</li>
        <li>User authentication (sign up, sign in, log out)</li>
        <li>Items CRUD features: user can add, update & delete items (text content + images) when logged</li>
        <li>There is a list of all items & when user is logged he sees trash & pencil icons to edit & delete his items, but not others items</li>
        <li>Dark/ light mode</li>
      </ul>
      <h3>This template includes the following components (at the moment):</h3>
      <ul>
        <li>(RWD) Header with nav links & auth buttons</li>
        <li>Sign in form</li>
        <li>Sign up form</li>
        <li>Dashboard</li>
        <li>About section (home page)</li>
        <li>Add item form</li>
        <li>Update item form</li>
        <li>Items list</li>
        <li>Item page</li>
        <li>Users List</li>
        <li>User page</li>
      </ul>
      <h3>Technologies used in project</h3>
      <ul>
        <li>React 17</li>
        <li>React Router 5.2</li>
        <li>React Context & useContext</li>
        <li>Firebase 9.1 (authentication, realtime database, storage)</li>
        <li>Bootstrap 5.1</li>
      </ul>
      <h3>To do</h3>
      <ul>
        <li>...</li>
      </ul>
    </div>
  );
}
