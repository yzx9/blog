import type { ClientAppEnhance } from "@vuepress/client"

// styles
import "./styles/index.css"
import "tailwindcss/tailwind.css"

// katex styles
import "katex/dist/katex.min.css"
import "markdown-it-texmath/css/texmath.css"

const clientAppEnhance: ClientAppEnhance = (ctx) => {}

export default clientAppEnhance
