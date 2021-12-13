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
      <p className="text-center mb-0 pb-3">Created by Vadim Gierko | 2021</p>
    </div>
  );
}
