import styles from "./page.module.scss";
import Nav from "@/components/Nav/Nav";
import Section from "@/components/sections/Section";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import ReachSection from "@/components/sections/ReachSection";

/* The whole site is this one page. Order here is the order on the page and in the nav.
   (/about, /experience and /portfolio redirect to /#about, /#experience and /#portfolio) */
const sections = [
  { id: "about", label: "About", content: <AboutSection/> },
  { id: "experience", label: "Experience", content: <ExperienceSection/> },
  { id: "portfolio", label: "Portfolio", content: <PortfolioSection/> },
  { id: "reach", label: "Reach me", content: <ReachSection/>, showLabel: false } /* its "Reach" "Me" bricks are the heading */
]

export default function Home() {
  return (
    <div className={styles.page}>
      <Nav sections={sections.map(({id, label}) => ({id, label}))}/>

      <header id="top" className={styles.hero}>
        <h1 className={`${styles.title} unselect`}>jaywithnoay</h1>
        <p className={styles.tagline}>Builder. Creator. Part-time Software Engineer.</p>
      </header>

      {sections.map(({id, label, content, showLabel}) => (
        <Section key={id} id={id} label={label} showLabel={showLabel}>{content}</Section>
      ))}
    </div>
  );
}
