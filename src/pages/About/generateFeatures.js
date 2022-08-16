// import icons:
import { MdDarkMode, MdFormatSize } from "react-icons/md";
import { GrNotes } from "react-icons/gr";
import {
	AiOutlineLock,
	AiOutlineCloud,
	AiOutlineBook,
	AiOutlineTags,
	AiOutlineSearch,
} from "react-icons/ai";

export default function generateFeatures(props) {
	return [
		{
			icon: <GrNotes {...props} />,
			header: "Notes",
			paragraph: "Add, update & delete notes.",
		},
		{
			icon: <AiOutlineTags {...props} />,
			header: "Tags",
			paragraph:
				"Organize your notes by tags. You can add as many tags to your notes as you want.",
		},
		{
			icon: <AiOutlineBook {...props} />,
			header: "Sources",
			paragraph:
				"Add sources/ references to your notes (including title, author, link, page/s numbers). If the source is already in your base, you can easily use it.",
		},
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
				"Format your notes using built-in markdown editor. Your notes can contain headers of 6 sizes, ordered, unordered & nested lists, images from the web, links, tables and more.",
		},
		{
			icon: <AiOutlineCloud {...props} />,
			header: "Access & sync on all devices",
			paragraph:
				"This app works in browser, so all you need is a device with Internet connection. You can use the app on your mobile, tablet or laptop etc. & you will be synced to your notes base.",
		},
		{
			icon: <MdDarkMode {...props} />,
			header: "Darkmode",
			paragraph:
				"You can use the app in 2 modes: light & dark. You can switch between them on one click!",
		},
		{
			icon: <AiOutlineLock {...props} />,
			header: "Privacy",
			paragraph:
				"All your notes & data is private. If you won't share your password with anyone, your data is absolutely secure.",
		},
	];
}
