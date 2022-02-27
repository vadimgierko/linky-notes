import { useTheme } from "../../hooks/use-theme";

export default function About() {
	const { theme } = useTheme();

	return (
		<div style={{ background: theme.background, color: theme.color }}>
			<p>
				<strong>
					<em>linky_notes</em>
				</strong>{" "}
				allows you to create notes with tags & sources.
			</p>
			<h3 className="text-danger">
				NOTE! At the moment (from 23.02) I'm adapting this app to a new
				architecture, data layer management pattern & security rules, so
				app is not working. Before these changes the app was dedicated
				only for my personal use, but after a few days anyone would be
				able to sign up & add notes :-) So stay tuned!
			</h3>
			<p>Thanks to that:</p>
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
			<p>
				<strong>
					At the moment this SPA is available for my personal use
					only,
				</strong>{" "}
				, because I've made it first of all for myself. I read a lot,
				create a lot and... do a lot notes. I couldn't manage hunderds
				of my notes, so I've decided to build this app. And I'm very
				proud, that finally, after one year of learning web development,
				I've solved one of my biggest problems thanks to my own app. Now
				my notes will be tagged, organized & easy to filter.
			</p>
			<p>
				You can see my notes, but cannot sign up or modify my database.
				I've implemented only basic core features for the moment, but
				app is still growing & is tested by me. When right time comes,
				I'll enable creating accounts for users like you ;-)
			</p>
			<p>At the moment, I can:</p>
			<ul>
				<li>sign in</li>
				<li>
					<strong>add, update & delete notes</strong> when logged
				</li>
				<li>
					add & delete <strong>tags</strong> for my notes or leave it
					without
				</li>
				<li>
					add & delete <strong>source</strong> for my notes or leave
					it without
				</li>
				<li>
					<strong>search/ filter notes by tag/ tags</strong>
				</li>
				<li>
					searching mechanism generates link for each searching
					session, so I can navigate beetween searching sessions and/
					or can send searching session link to someone if I need to
				</li>
				<li>switch dark/ light mode</li>
			</ul>
			<p>Technologies I've used in this project</p>
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
