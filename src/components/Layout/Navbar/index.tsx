"use client";
// import { useTheme } from "../../contexts/useTheme";
// react-bootstrap:
import Container from "react-bootstrap/Container";
// import Badge from "react-bootstrap/Badge";
// auth:
// import logOut from "../../auth/logOut";
// react-icons:
import { BsSunFill, BsMoonFill, BsSearch } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import {
	AiOutlineTags,
	AiOutlineInfoCircle,
	AiOutlineFileMarkdown,
	AiOutlineLogout,
	AiOutlineLogin,
	AiOutlineLock,
} from "react-icons/ai";
import { BiRocket, BiUserCheck } from "react-icons/bi";
import { BsBoxSeam } from "react-icons/bs";
import Link from "next/link";
import { Button, Modal, Nav, Navbar } from "react-bootstrap";
import { useState } from "react";
import useTheme from "@/context/useTheme";
import logOut from "@/auth/logOut";
import useUser from "@/context/useUser";
import useNotes from "@/context/useNotes";
import useTags from "@/context/useTags";
import NotesSearch from "@/components/NotesSearch";

const pencilSquareButtonClassName = "me-2 text-"; // collapsed ms-auto me-2

export default function NavBar({ maxWidth }: { maxWidth: number }) {
	const { theme, switchTheme } = useTheme();
	const { user } = useUser();
	const { notesNum } = useNotes();
	const { tagsNum } = useTags();
	// for add note & search icons:
	const [isAddIconHovering, setIsAddIconHovering] = useState(false);
	const handleMouseEnterAddIcon = () => setIsAddIconHovering(true);
	const handleMouseLeaveAddIcon = () => setIsAddIconHovering(false);
	const [isSearchIconHovering, setIsSearchIconHovering] = useState(false);
	const handleMouseEnterSearchIcon = () => setIsSearchIconHovering(true);
	const handleMouseLeaveSearchIcon = () => setIsSearchIconHovering(false);
	// for search modal:
	const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
	const handleCloseSearchModal = () => setIsSearchModalOpen(false);

	const LINKS = {
		public: [
			{
				name: "about",
				link: "/",
				icon: <AiOutlineInfoCircle className="me-3" />,
			},
			{
				name: "how to format your notes",
				link: "/guides/markdown-guide",
				icon: <AiOutlineFileMarkdown className="me-3" />,
			},
			{
				name: "how to use the app efficiently",
				link: "/guides/app-guide",
				icon: <BiRocket className="me-3" />,
			},
			{
				name: "how to create an internal app",
				link: "/guides/internal-app-guide",
				icon: <BsBoxSeam className="me-3" />,
			},
		],
		private: [
			{
				name: notesNum ? `notes (${notesNum})` : "notes",
				link: "/notes",
				icon: <CgNotes className="me-3" />,
			},
			{
				name: `tags (${tagsNum})`,
				link: "/tags",
				icon: <AiOutlineTags className="me-3" />,
			},
		],
	};

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
				<Link href="/" passHref legacyBehavior>
					<Navbar.Brand>linky_notes</Navbar.Brand>
				</Link>

				{user && <span className="collapsed ms-auto me-2 d-flex">
					{/**================== ADD NOTE ICON ==================*/}
					<Link href="/notes/add" passHref legacyBehavior>
						<Nav.Link
							className={
								isAddIconHovering
									? theme === "dark"
										? pencilSquareButtonClassName + "light"
										: pencilSquareButtonClassName + "dark"
									: pencilSquareButtonClassName + "secondary"
							}
							onMouseEnter={handleMouseEnterAddIcon}
							onMouseLeave={handleMouseLeaveAddIcon}
						>
							<BsPencilSquare size={30} />
						</Nav.Link>
					</Link>
					{/**================== SEARCH ICON & MODAL ==================*/}
					<Nav.Link
						className={
							isSearchIconHovering
								? theme === "dark"
									? pencilSquareButtonClassName + "light"
									: pencilSquareButtonClassName + "dark"
								: pencilSquareButtonClassName + "secondary"
						}
						onMouseEnter={handleMouseEnterSearchIcon}
						onMouseLeave={handleMouseLeaveSearchIcon}
						onClick={() => setIsSearchModalOpen(true)}
					>
						<BsSearch size={30} />
					</Nav.Link>
				</span>}

				<Modal
					show={isSearchModalOpen}
					onHide={handleCloseSearchModal}
					//fullscreen={true}
					size="lg"
				>
					<NotesSearch
						closeModal={() => {
							// if (
							// 	confirm("Are you sure you want to leave current page? All progress will be lost...")
							// ) {
								setIsSearchModalOpen(true);
							//}
						}}
					/>

					<Modal.Footer>
						<Button variant="secondary" onClick={handleCloseSearchModal}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>

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
											</Nav.Link>
										) : link.name === "tags" ? (
											<Nav.Link>
												{link.icon ? link.icon : null}
												{link.name}
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
							<Link href="/" passHref legacyBehavior>
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

						<Link href="/password-reset" passHref legacyBehavior>
							<Nav.Link>
								<AiOutlineLock className="me-3" />
								<span>reset password</span>
							</Nav.Link>
						</Link>

						{/* {
							user && tags &&
							<Button
								onClick={() => upgradeRTDBtoV1({ uid: user.uid, prevTags: tags })}
							>
								upgrade tags & notes
							</Button>
						} */}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
