// import icons:
import {
	SiReact,
	SiFirebase,
	SiBootstrap,
	SiCss3,
	SiMarkdown,
	SiHtml5,
	SiTypescript,
	SiNextdotjs
} from "react-icons/si";
import { IconProps } from "./types";

export default function generateTechnologies(props: IconProps) {
	return [
		{
			icon: <SiNextdotjs {...props} />,
			header: "Next.js",
		},
		{
			icon: <SiReact {...props} />,
			header: "React",
		},
		{
			icon: <SiTypescript {...props} />,
			header: "TypeScript",
		},
		{
			icon: <SiFirebase {...props} />,
			header: "Firebase",
		},
		{
			icon: <SiBootstrap {...props} />,
			header: "Bootstrap",
		},
		{
			icon: <SiMarkdown {...props} />,
			header: "Markdown",
		},
		{
			icon: <SiCss3 {...props} />,
			header: "CSS",
		},
		{
			icon: <SiHtml5 {...props} />,
			header: "HTML",
		},
	];
}