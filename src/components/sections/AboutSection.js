import Card from "@/components/Card/Card"
import styles from "./AboutSection.module.scss"

export default function AboutSection() {
    return (
        <div className={styles.about}>
            <Card/>
            <p className={styles.intro}>
                Hi - I&apos;m JJ. I love to create and build. I'm interested in blockchain technology. Currently, learning about Java and loving it! I collect pokemon cards (Tomokazu Komiya!) and do sewing from time to time. Tell me more about your latest world-bending projects!
            </p>
        </div>
    )
}
