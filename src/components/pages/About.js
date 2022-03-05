import { useTheme } from "../../hooks/use-theme";

export default function About() {
	const { theme } = useTheme();

	return (
		<div style={{ background: theme.background, color: theme.color }}>
			<h1>
				<strong>
					<em>linky_notes</em>
				</strong>{" "}
				allows you to create notes with tags & sources.
			</h1>
			<h2>What you can do with the app at the moment</h2>
			<ul>
				<li>sign in/up</li>
				<li>
					<strong>add, update & delete notes</strong> when logged
				</li>
				<li>
					add & delete <strong>tags</strong> for the notes or leave it
					without tags
				</li>
				<li>
					<strike>
						add & delete <strong>source</strong> for my notes or
						leave it without source
					</strike>{" "}
					(comming soon - after massive rebuild from scratch, I need
					some time to rebuild & add the feature once again, but...
					you can use the app & add notes - you will add sources later
					by updating your existing notes ;-)
				</li>
				<li>
					<strong>search/ filter notes by tag/ tags</strong>
				</li>
				<li>
					searching mechanism generates link for each searching
					session, so I can navigate beetween searching sessions
				</li>
				<li>switch dark/light mode</li>
			</ul>
			<h2>Why your notes will be better thanks to linky_notes</h2>
			<ul>
				<li>your notes are linked with each other by tags</li>
				<li>they are grouped by tags & sources</li>
				<li>
					the note can have few tags, so it would be in a few keywords
					groups
				</li>
				<li>
					you don't need to put them in folders or do any index or
					table of content
				</li>
				<li>
					that is easy to find the particular note by choosing
					keywords they consist in search field
				</li>
				<li>
					you are saving a tone of time to organize & efficiently use
					them
				</li>
			</ul>
			<h3 className="text-danger">
				NOTE! At the moment (from 23.02) I'm adapting this app to a new
				architecture, data layer management pattern & security rules.
				From 05.03 you can sign up, add, edit & delete notes, add &
				delete tags to them, but not adding the source. I rebuild the
				app basically from scratch, and now it's available not only for
				my personal use, like it was before, but for everyone! You can
				add your notes at the moment, and when I add "add source"
				feature, you can just update your notes.
			</h3>
			<h2>Motivation</h2>
			<p>
				I've made this app first of all for myself. I read a lot, create
				a lot and... do a lot notes. I couldn't manage hunderds of my
				notes, so I've decided to build this app. And I'm very proud,
				that finally, after one year of learning web development, I've
				solved one of my biggest problems thanks to my own app. Now my
				notes will be tagged, organized & easy to filter.
			</p>
			<h2>Technologies I've used in this project</h2>
			<ul>
				<li>React 17</li>
				<li>React Router 5.2</li>
				<li>React Context & useContext</li>
				<li>
					Firebase 9.1 (authentication, realtime database, storage)
				</li>
				<li>Bootstrap 5.1</li>
			</ul>
		</div>
	);
}
