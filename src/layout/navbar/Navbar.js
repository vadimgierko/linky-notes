import { useEffect, useState } from "react";
import { useTheme } from "../../contexts/useTheme";
// react-router-bootstrap for link container:
import { LinkContainer } from "react-router-bootstrap";
// react-bootstrap components:
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
// react icons:
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import { useSelector } from "react-redux";
// auth:
import logOut from "../../auth/logOut";

const LINKS = {
	public: [{ name: "about", link: "/about" }],
	private: [
		{ name: "notes", link: "/" },
		{ name: "tags", link: "/tags" },
		{ name: "authors", link: "/authors" },
		{ name: "sources", link: "/sources" },
	],
};

export default function ({ maxWidth }) {
	const { theme, switchTheme } = useTheme();
	const user = useSelector((state) => state.user.value);
	const NOTES = useSelector((state) => state.notes.value);
	const [screenWidth, setScreenWidth] = useState();

	// check & set screen width to show | in navbar if >=992:
	useEffect(() => {
		window.addEventListener("resize", (e) => {
			setScreenWidth(window.innerWidth);
			//console.log("screen width:", window.innerWidth);
		});
	}, []);

	return (
		<Navbar
			collapseOnSelect
			expand="lg"
			bg={theme}
			variant={theme}
			fixed="top"
			className="shadow"
		>
			<Container style={{ maxWidth: maxWidth }}>
				<Navbar.Brand href="#">linky_notes</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					{/** links */}
					<Nav className="me-auto">
						{LINKS.public.map((link) => (
							<LinkContainer key={link.name} to={link.link}>
								<Nav.Link>{link.name}</Nav.Link>
							</LinkContainer>
						))}
						<Nav.Link
							href="https://www.markdownguide.org/cheat-sheet/"
							target="_blank"
						>
							markdown guide
						</Nav.Link>
						{screenWidth >= 992 && user.id ? (
							<Nav.Link disabled>
								<span> | </span>
							</Nav.Link>
						) : null}
						{screenWidth < 992 && user.id ? (
							<hr style={{ color: "grey" }} />
						) : null}
						{user.id &&
							LINKS.private.map((link) => (
								<LinkContainer key={link.name} to={link.link}>
									<Nav.Link>{link.name}</Nav.Link>
									{/* {link.name === "notes" ? (
										<Nav.Link>
											{link.name}{" "}
											<Badge bg="danger">{Object.keys(NOTES).length}</Badge>
										</Nav.Link>
									) : (
										<Nav.Link>{link.name}</Nav.Link>
									)} */}
								</LinkContainer>
							))}
					</Nav>
					<hr style={{ color: "grey" }} />
					<Nav>
						{user.id ? (
							<>
								<Nav.Link href="#" disabled>
									{user.email}
								</Nav.Link>
								<LinkContainer to="/about">
									<Nav.Link onClick={logOut}>log out</Nav.Link>
								</LinkContainer>
							</>
						) : (
							<>
								<LinkContainer to="/signin">
									<Nav.Link>sign in</Nav.Link>
								</LinkContainer>
								<LinkContainer as={Nav.Link} to="/signup">
									<Nav.Link>sign up</Nav.Link>
								</LinkContainer>
							</>
						)}
						<Nav.Link onClick={switchTheme}>
							{theme === "light" ? <BsMoonFill /> : <BsSunFill />}
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
