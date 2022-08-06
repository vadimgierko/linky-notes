import { useTheme } from "../../contexts/useTheme";
// react-router-bootstrap for link container:
import { LinkContainer } from "react-router-bootstrap";
// react-bootstrap components:
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
// react icons:
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import { useSelector } from "react-redux";
// auth:
import logOut from "../../auth/logOut";

const SECTIONS_LIST = [
	{ name: "about", link: "/about" },
	{ name: "notes", link: "/" },
	{ name: "tags", link: "/tags" },
	{ name: "authors", link: "/authors" },
	{ name: "sources", link: "/sources" },
];

export default function () {
	const { theme, switchTheme } = useTheme();
	const user = useSelector((state) => state.user.value);

	return (
		<Navbar
			collapseOnSelect
			expand="lg"
			bg={theme}
			variant={theme}
			fixed="top"
			className="shadow"
		>
			<Container style={{ maxWidth: 900 }}>
				<Navbar.Brand href="#">linky_notes</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					{/** sections */}
					<Nav className="me-auto">
						{SECTIONS_LIST.map((section) => (
							<LinkContainer key={section.name} to={section.link}>
								<Nav.Link>{section.name}</Nav.Link>
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
