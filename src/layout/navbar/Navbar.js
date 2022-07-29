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
	{ name: "notes", link: "/notes" },
	{ name: "tags", link: "/tags" },
	{ name: "add note", link: "/add-note" },
];

export default function () {
	const { theme, switchTheme } = useTheme();
	const user = useSelector((state) => state.user.value);

	return (
		<Navbar collapseOnSelect expand="lg" bg={theme} variant={theme} fixed="top">
			<Container>
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
					{/** buttons */}
					<Nav>
						{/** auth buttons */}
						{user.id && (
							<>
								<Navbar.Link href="#">{user.email}</Navbar.Link>
								<LinkContainer to="/about">
									<Button
										as={Nav.Link}
										variant="outline-danger"
										className="m-1"
										onClick={logOut}
									>
										Log Out
									</Button>
								</LinkContainer>
							</>
						)}
						{!user.id && (
							<>
								<LinkContainer to="/signin">
									<Button
										as={Nav.Link}
										variant="outline-success"
										className="m-1"
									>
										Sign In
									</Button>
								</LinkContainer>
								<LinkContainer to="/signup">
									<Button as={Nav.Link} variant="outline-info" className="m-1">
										Sign Up
									</Button>
								</LinkContainer>
							</>
						)}
						{/** mode button */}
						<Button
							variant={theme === "light" ? "outline-dark" : "outline-light"}
							onClick={switchTheme}
							className="m-1"
						>
							{theme === "light" && <BsMoonFill />}
							{theme === "dark" && <BsSunFill />}
						</Button>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
