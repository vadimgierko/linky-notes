import { CSSProperties, JSX } from "react"

export type Card = {
    icon: JSX.Element
    header?: string
    paragraph?: string
}

export type CardStyle = CSSProperties | undefined

export type IconProps = {
    style?: CSSProperties
    size: number;
}