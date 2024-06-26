import { useState } from "react";
import { useTheme } from "../../contexts/useTheme";
import { useSelector } from "react-redux";
// react-router-bootstrap for link container:
import { LinkContainer } from "react-router-bootstrap";
// react-bootstrap:
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
// auth:
import logOut from "../../auth/logOut";
// react-icons:
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import {
	AiOutlineTags,
	AiOutlineInfoCircle,
	AiOutlineFileMarkdown,
	AiOutlineLogout,
	AiOutlineLogin,
} from "react-icons/ai";
import { BiUserCheck, BiRocket } from "react-icons/bi";
import { BsBoxSeam } from "react-icons/bs";

const LINKS = {
	public: [
		{
			name: "about the app",
			link: "/about",
			icon: <AiOutlineInfoCircle className="me-3" />,
		},
		{
			name: "how to format your notes",
			link: "/markdown-guide",
			icon: <AiOutlineFileMarkdown className="me-3" />,
		},
		{
			name: "how to use the app efficiently",
			link: "/app-guide",
			icon: <BiRocket className="me-3" />,
		},
		{
			name: "how to create an inner app inside the app",
			link: "/inner-app-guide",
			icon: <BsBoxSeam className="me-3" />,
		},
	],
	private: [
		{ name: "notes", link: "/", icon: <CgNotes className="me-3" /> },
		{ name: "tags", link: "/tags", icon: <AiOutlineTags className="me-3" /> },
	],
};

export default function ({ maxWidth }) {
	const { theme, switchTheme } = useTheme();
	const user = useSelector((state) => state.user.value);
	const NOTES = useSelector((state) => state.notes.value);
	const TAGS = useSelector((state) => state.tags.value);
	const [isHovering, setIsHovering] = useState(false);

	const handleMouseEnter = () => {
		setIsHovering(true);
	};

	const handleMouseLeave = () => {
		setIsHovering(false);
	};

	return (
		<Navbar
			id="navbar"
			collapseOnSelect
			expand={false} // there will be always only brand & hamburger button shown
			bg={theme}
			variant={theme}
			fixed="top"
			className="shadow"
		>
			<Container style={{ maxWidth: maxWidth }}>
				<LinkContainer to="/about">
					<Navbar.Brand>linky_notes</Navbar.Brand>
				</LinkContainer>
				<LinkContainer
					to="/add-note"
					className={
						isHovering
							? theme === "dark"
								? "collapsed ms-auto me-2 text-light"
								: "collapsed ms-auto me-2 text-dark"
							: "collapsed ms-auto me-2 text-secondary"
					}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					<Nav.Link>
						<BsPencilSquare size={30} />
					</Nav.Link>
				</LinkContainer>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						{user.id && (
							<Nav.Link href="#" disabled>
								<BiUserCheck className="me-3" />
								{user.email}
							</Nav.Link>
						)}
						{user.id &&
							LINKS.private.map((link) => (
								<LinkContainer key={link.name} to={link.link}>
									{link.name === "notes" ? (
										<Nav.Link>
											{link.icon ? link.icon : null}
											<strong>{link.name}</strong>
											<Badge bg="secondary" className="ms-3">
												{Object.keys(NOTES).length}
											</Badge>
										</Nav.Link>
									) : link.name === "tags" ? (
										<Nav.Link>
											{link.icon ? link.icon : null}
											{link.name}
											<Badge bg="secondary" className="ms-3">
												{Object.keys(TAGS).length}
											</Badge>
										</Nav.Link>
									) : (
										<Nav.Link>
											{link.icon ? link.icon : null}
											{link.name}
										</Nav.Link>
									)}
								</LinkContainer>
							))}
						<hr style={{ color: "grey" }} />
						{LINKS.public.map((link) => (
							<LinkContainer key={link.name} to={link.link}>
								<Nav.Link>
									{link.icon ? link.icon : null}
									{link.name}
								</Nav.Link>
							</LinkContainer>
						))}
						<hr style={{ color: "grey" }} />
						<LinkContainer to="#">
							<Nav.Link onClick={switchTheme}>
								{theme === "light" ? (
									<BsMoonFill className="me-3" />
								) : (
									<BsSunFill className="me-3" />
								)}
								{theme === "light" ? "switch to dark" : "switch to light"}
							</Nav.Link>
						</LinkContainer>
						<hr style={{ color: "grey" }} />
						{user.id ? (
							<LinkContainer to="/about">
								<Nav.Link onClick={logOut}>
									<AiOutlineLogout className="me-3" />
									<span>log out</span>
								</Nav.Link>
							</LinkContainer>
						) : (
							<>
								<LinkContainer to="/signin">
									<Nav.Link>
										<AiOutlineLogin className="me-3" />
										<span>sign in</span>
									</Nav.Link>
								</LinkContainer>
								<LinkContainer as={Nav.Link} to="/signup">
									<Nav.Link>
										<AiOutlineLogin className="me-3" />
										<span>sign up</span>
									</Nav.Link>
								</LinkContainer>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
