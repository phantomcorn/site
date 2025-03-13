"use client"
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation"
import styles from "./page.module.css";
import Dial from "@/components/Dial/Dial";

const filterConst = {
  opacity: 0.4,
  blur: 5
}

export default function Home() {

  const router = useRouter();

  const titleRef1 = useRef(null)
  const titleRef2 = useRef(null)
  const animationFrameId = useRef(null);
  const [activeDial, setActiveDial] = useState(null) //dial currently turned on

  const [dials, setDegrees] = useState(
    { 
      dial1: {
        deg: 0,
        color: "#5E5E31",
        text: "About",
        route: "/about"
      }, 
      dial2: {
        deg: 0,
        color: "#3D6DD6",
        text: "Experience",
        route: "/experience"
      }, 
      dial3: {
        deg: 0,
        color: "#8F70C7",
        text: "Portfolio",
        route: "/portfolio"
      }, 
      dial4: {
        deg: 0,
        color: "#894E38",
        text: "e.t.c",
        route: "/etc"
      }
    }
  );

  const updateDegree = (id, value) => {

    setDegrees((prev) => ({
      ...Object.keys(prev).reduce((acc, key) => {
          acc[key] = { 
            ...prev[key], //Retain unchange keys
            deg: key === id ? value : 0 
          }
          return acc
      }, {})
    }));

    //Normalise to [0, 100]
    const valNorm = 100 * value / 360;
    titleRef1.current.style.setProperty("color", `color-mix(in srgb, var(--primary-two), ${dials[id].color} ${valNorm}%)`)
    titleRef2.current.style.setProperty("color", `color-mix(in srgb, var(--primary-two), ${dials[id].color} ${valNorm}%)`)
    setActiveDial(id)
  };

  const navigate = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (activeDial) {
      router.push(dials[activeDial].route)
    }
  }

  useEffect(() => {
  
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      doMorph();
    };

    const doMorph = () => {
      let fraction = activeDial ? dials[activeDial].deg / 360 : 0 ; //proportion of time until fully morphed
      setMorph(fraction);
    };

    const setMorph = (fraction) => {
      if (!titleRef1.current || !titleRef2.current) return;

      titleRef2.current.style.setProperty("--title-two-blur", `blur(${Math.min(filterConst.blur / fraction - filterConst.blur , 100)}px)`)  
      titleRef2.current.style.setProperty("--title-two-opacity",`${Math.pow(fraction, filterConst.opacity) * 100}%`)

      fraction = 1 - fraction;
      titleRef1.current.style.setProperty("--title-one-blur", `blur(${Math.min(filterConst.blur  / fraction - filterConst.blur , 100)}px)`)
      titleRef1.current.style.setProperty("--title-one-opacity", `${Math.pow(fraction, filterConst.opacity) * 100}%`)
    };

    animate(); // Start animation loop
    
    return () => {
      cancelAnimationFrame(animationFrameId.current)
    };
  }, [dials]);

  return (
    <div className={styles.page}>
      <div className={styles.morph}>
        <div ref={titleRef1} className={`${styles.title} unselect ${styles["title-one"]}`}> jaywithnoay</div>
        <div ref={titleRef2} className={`${styles.title} unselect ${styles["title-two"]}`} onClick={navigate}> {activeDial? dials[activeDial].text : ""} </div>
      </div>
     
      <div className={styles["dial-group"]}> 
        <Dial deg={dials["dial1"].deg} setDeg={updateDegree} id="dial1" variant="color1" activeDial={activeDial}></Dial>
        <Dial deg={dials["dial2"].deg} setDeg={updateDegree} id="dial2" variant="color2" activeDial={activeDial}></Dial>
        <Dial deg={dials["dial3"].deg} setDeg={updateDegree} id="dial3" variant="color3" activeDial={activeDial}></Dial>
        <Dial deg={dials["dial4"].deg} setDeg={updateDegree} id="dial4" variant="color4" activeDial={activeDial}></Dial>
      </div>
    </div>
  );
}
