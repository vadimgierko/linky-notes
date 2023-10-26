// import icons:
import { MdDarkMode, MdFormatSize } from "react-icons/md";
import { CgNotes } from "react-icons/cg";
import {
	AiOutlineLock,
	AiOutlineCloud,
	AiOutlineBook,
	AiOutlineTags,
	AiOutlineSearch,
	AiOutlineCloudDownload,
} from "react-icons/ai";

export default function generateFeatures(props) {
	return [
		{
			icon: <CgNotes {...props} />,
			header: "Notes",
			paragraph: "Add, update & delete notes.",
		},
		{
			icon: <AiOutlineTags {...props} />,
			header: "Tags",
			paragraph:
				"Organize your notes by tags. You can add as many tags to your notes as you want.",
		},
		// {
		// 	icon: <AiOutlineBook {...props} />,
		// 	header: "Sources",
		// 	paragraph:
		// 		"Add sources/ references to your notes (including title, author, link, page/s numbers).",
		// },
		{
			icon: <AiOutlineSearch {...props} />,
			header: "Filter/ Search",
			paragraph:
				"You can filter your notes by one or a few tags. You can also navigate between filtering sessions.",
		},
		{
			icon: <MdFormatSize {...props} />,
			header: "Format",
			paragraph:
				"Format/style your notes with Markdown syntax or/and HTML with inline styles to include headers, lists, images from the web, links etc.",
		},
		{
			icon: <AiOutlineCloudDownload {...props} />,
			header: "Access & sync on all devices",
			paragraph:
				"This app works in a browser & is installable (PWA), so all you need is a device (mobile, tablet or laptop) with the Internet connection.",
		},
		{
			icon: <MdDarkMode {...props} />,
			header: "Darkmode",
			paragraph: "You can use the app in light & dark mode.",
		},
		{
			icon: <AiOutlineLock {...props} />,
			header: "Privacy",
			paragraph:
				"All your notes & data is private. If you won't share your password with anyone, your data is absolutely secure.",
		},
	];
}
