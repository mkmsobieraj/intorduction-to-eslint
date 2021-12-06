import Reveal from "reveal.js";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/league.css";
import "reveal.js/plugin/highlight/monokai.css";
import "./styles.css";
import Markdown from "reveal.js/plugin/markdown/markdown.esm.js";
import RevealNotes from "reveal.js/plugin/notes/notes.esm.js";
import RevealHighlight from "reveal.js/plugin/highlight/highlight.esm.js";

new Reveal().initialize({
  hash: true,
  progress: true,
  transition: "convex",
  plugins: [Markdown, RevealNotes, RevealHighlight],
});
