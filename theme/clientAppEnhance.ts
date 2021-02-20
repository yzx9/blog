import type { ClientAppEnhance } from "@vuepress/client"

import "tailwindcss/tailwind.css"
import "./styles/index.css"
import "./styles/legacy/index.scss"

const clientAppEnhance: ClientAppEnhance = (ctx) => {}

export default clientAppEnhance
