import { ThemeProvider } from "./hooks/use-theme.js";
import { AuthProvider } from "./hooks/use-auth.js";
import { DatabaseProvider } from "./hooks/use-database.js";
import Container from "./pages/Container";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DatabaseProvider>
          <Container />
        </DatabaseProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
