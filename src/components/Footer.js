import { useTheme } from "../hooks/use-theme";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <div
      style={{
        background: theme.background,
        color: theme.color
      }}
    >
      <hr />
      <p className="text-center mb-0 pb-3">&copy; 2021 Vadim Gierko</p>
    </div>
  );
}
