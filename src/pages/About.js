import { useTheme } from "../hooks/use-theme";

export default function About() {
  const { theme } = useTheme();
  
  return (
    <div
      style={{ background: theme.background, color: theme.color }}
    >
      <p><strong><em>linky_notes</em></strong> allows you to create notes with keywords, which works similarly to tags.</p>
      <p>Thanks to that:</p>
      <ul>
        <li>your notes are linked with each other by keywords</li>
        <li>they are grouped</li>
        <li>same note can be in a few keywords groups</li>
        <li>you don't need to put them in folders or do any index or table of content</li>
        <li>that is easy to find the particular note by choosing keywords they consist in search field</li>
        <li>you are saving a tone of time to organize & efficiently use them</li>
      </ul>
      <p>
        <strong>At the moment this SPA is available for my personal use only.</strong> You can see my notes, but cannot sign up or modify my database. I've implemented only basic core features for the moment, but app is still growing & is tested.</p>
      <p>At the moment, I can:</p>
      <ul>
        <li>sign in</li>
        <li>add, update & delete notes when logged</li>
        <li>see a list of all items</li>
        <li>add & delete tags for my notes (can leave it without tags also)</li>
        <li>find note/ notes by tag/ tags</li>
        <li>switch dark/ light mode</li>
      </ul>
      <p>Technologies I've used in this project</p>
      <ul>
        <li>React 17</li>
        <li>React Router 5.2</li>
        <li>React Context & useContext</li>
        <li>Firebase 9.1 (authentication, realtime database, storage)</li>
        <li>Bootstrap 5.1</li>
      </ul>
    </div>
  );
}
