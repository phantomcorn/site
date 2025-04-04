export const text = {
    initial: {
        opacity: 1,
    },
    enter: {
        opacity: 0,
        top: -100,
        transition: {duration: .75, delay: .35, ease: [0.76, 0, 0.24, 1]},
        transitionEnd: {top: "47.5%"}
    },
    exit: {
        opacity: 1,
        top: "40%",
        transition: {duration: .5, delay: .4, ease: [0.33, 1, 0.68, 1]}
    }
}

export const curve = (initialPath, targetPath) => {

    return {
        initial: {
            d: initialPath
        },
        enter: {
            d: targetPath,
            transition: {duration: .75, delay: .35, ease: [0.76, 0, 0.24, 1]}
        },
        exit: {
            d: initialPath,
            transition: {duration: .75, ease: [0.76, 0, 0.24, 1]}
        }
    }
}

export const translate = (fromExternal) => {

    const duration = fromExternal ? 1.3 : .75
    // const ease = fromExternal ? [1,0.3,0.24,1] : [0.76, 0, 0.24, 1] 


    return {
        initial: {
            top: "-27vh"
        },
        enter: {
            top: "-100vh",
            transition: {duration: duration, delay: .35, ease: [0.76, 0, 0.24, 1] },
            transitionEnd : {
                top: "100vh"
            }
        },
        exit: {
            top: "-27vh",
            transition: {duration: .75, ease: [0.76, 0, 0.24, 1]}
        }
    }
}