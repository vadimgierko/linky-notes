"use client";
// import { useTheme } from "../../contexts/useTheme";
// react-bootstrap:
import Container from "react-bootstrap/Container";
// import Badge from "react-bootstrap/Badge";
// auth:
// import logOut from "../../auth/logOut";
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
import { BiRocket, BiUserCheck } from "react-icons/bi";
import { BsBoxSeam } from "react-icons/bs";
import Link from "next/link";
import { Nav, Navbar } from "react-bootstrap";
import { useEffect, useState } from "react";
import useTheme from "@/context/useTheme";
import { auth } from "@/firebaseConfig";
import { User } from "firebase/auth";
import logOut from "@/auth/logOut";

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

const pencilSquareButtonClassName = "collapsed ms-auto me-2 text-";

export default function NavBar({ maxWidth }: { maxWidth: number }) {
	const { theme, switchTheme } = useTheme();
	const [user, setUser] = useState<User | null>(null);
	// const user = useSelector((state) => state.user.value);
	// const NOTES = useSelector((state) => state.notes.value);
	// const TAGS = useSelector((state) => state.tags.value);
	const [isHovering, setIsHovering] = useState(false);

	const handleMouseEnter = () => setIsHovering(true);

	const handleMouseLeave = () => setIsHovering(false);

	// check for logged user:
	useEffect(() => {
		if (auth.currentUser) {
			setUser(auth.currentUser);
		} else {
			setUser(null);
		}
	}, []);

	return (
		<Navbar
			id="navbar"
			collapseOnSelect
			expand={false} // there will be always only brand & hamburger button shown
			bg={theme}
			fixed="top"
			className="shadow"
		>
			<Container style={{ maxWidth: maxWidth }}>
				<Link href="/about" passHref legacyBehavior>
					<Navbar.Brand>linky_notes</Navbar.Brand>
				</Link>
				<Link href="/add-note" passHref legacyBehavior>
					<Nav.Link
						className={
							isHovering
								? theme === "dark"
									? pencilSquareButtonClassName + "light"
									: pencilSquareButtonClassName + "dark"
								: pencilSquareButtonClassName + "secondary"
						}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					>
						<BsPencilSquare size={30} />
					</Nav.Link>
				</Link>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						{user && (
							<>
								<Nav.Link href="#" disabled>
									<BiUserCheck className="me-3" />
									{user.email}
								</Nav.Link>

								{LINKS.private.map((link) => (
									<Link
										key={link.name}
										href={link.link}
										passHref
										legacyBehavior
									>
										{link.name === "notes" ? (
											<Nav.Link>
												{link.icon ? link.icon : null}
												<strong>{link.name}</strong>
												{/* <Badge bg="secondary" className="ms-3">
												{Object.keys(NOTES).length}
											</Badge> */}
											</Nav.Link>
										) : link.name === "tags" ? (
											<Nav.Link>
												{link.icon ? link.icon : null}
												{link.name}
												{/* <Badge bg="secondary" className="ms-3">
												{Object.keys(TAGS).length}
											</Badge> */}
											</Nav.Link>
										) : (
											<Nav.Link>
												{link.icon ? link.icon : null}
												{link.name}
											</Nav.Link>
										)}
									</Link>
								))}
							</>
						)}

						<hr style={{ color: "grey" }} />
						{LINKS.public.map((link) => (
							<Link key={link.name} href={link.link} passHref legacyBehavior>
								<Nav.Link>
									{link.icon ? link.icon : null}
									{link.name}
								</Nav.Link>
							</Link>
						))}
						<hr style={{ color: "grey" }} />

						<Nav.Link onClick={switchTheme}>
							{theme === "light" ? (
								<BsMoonFill className="me-3" />
							) : (
								<BsSunFill className="me-3" />
							)}
							{theme === "light" ? "switch to dark" : "switch to light"}
						</Nav.Link>

						<hr style={{ color: "grey" }} />

						{user ? (
							<Link href="/about" passHref legacyBehavior>
								<Nav.Link onClick={logOut}>
									<AiOutlineLogout className="me-3" />
									<span>log out</span>
								</Nav.Link>
							</Link>
						) : (
							<>
								<Link href="/signin" passHref legacyBehavior>
									<Nav.Link>
										<AiOutlineLogin className="me-3" />
										<span>sign in</span>
									</Nav.Link>
								</Link>
								<Link href="/signup" passHref legacyBehavior>
									<Nav.Link>
										<AiOutlineLogin className="me-3" />
										<span>sign up</span>
									</Nav.Link>
								</Link>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
