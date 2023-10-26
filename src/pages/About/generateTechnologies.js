// import icons:
import {
	SiReact,
	SiJavascript,
	SiRedux,
	SiFirebase,
	SiBootstrap,
	SiReactrouter,
	SiCss3,
	SiMarkdown,
	SiHtml5
} from "react-icons/si";

export default function generateTechnologies(props) {
	return [
		{
			icon: <SiReact {...props} />,
			header: "React",
		},
		{
			icon: <SiJavascript {...props} />,
			header: "JavaScript",
		},
		{
			icon: <SiRedux {...props} />,
			header: "Redux",
		},
		{
			icon: <SiReactrouter {...props} />,
			header: "React Router",
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
