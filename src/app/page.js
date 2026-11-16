import styles from "./page.module.scss";
import Nav from "@/components/Nav/Nav";
import Section from "@/components/sections/Section";
import SplitRow from "@/components/sections/SplitRow";
import PortfolioSection from "@/components/sections/PortfolioSection";
import ReachSection from "@/components/sections/ReachSection";

/* The whole site is this one page.
   (/about, /experience and /portfolio redirect to /#about, /#experience and /#portfolio) */
const navSections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "portfolio", label: "Portfolio" },
  { id: "reach", label: "Reach me" }
]

export default function Home() {
  return (
    <div className={styles.page}>
      <Nav sections={navSections}/>

      <header id="top" className={styles.hero}>
        <h1 className={`${styles.title} unselect`}>jaywithnoay</h1>
        <p className={styles.tagline}>Builder. Creator. Part-time Software Engineer.</p>
      </header>

      {/* Row 1: About and Experience share a row (ids "about" and "experience" live inside) */}
      <SplitRow/>

      {/* Row 2: full width */}
      <Section id="portfolio" label="Portfolio"><PortfolioSection/></Section>

      {/* Row 3: edge to edge; its "Reach" "Me" bricks are the heading */}
      <Section id="reach" label="Reach me" showLabel={false}><ReachSection/></Section>
    </div>
  );
}
