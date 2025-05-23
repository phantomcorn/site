
const projects = {
    "oasis-residence": {
        type: "web",
        media: ["https://res.cloudinary.com/dmg2dllnz/image/upload/v1744003525/or_1_pobzem.avif",
                "https://res.cloudinary.com/dmg2dllnz/image/upload/v1744003525/or_2_rbgpxc.avif",
                "https://res.cloudinary.com/dmg2dllnz/image/upload/v1744003526/or_3_hwzbns.avif",
                "https://res.cloudinary.com/dmg2dllnz/image/upload/v1744003526/or_4_jyg1zm.avif"],
        width: 3840,
        height: 2240,
        alt: "Oasis residence media",
        site: "https://oasisresidences.netlify.app/",
        copy: '"It ain\'t much but it\'s honest work."'
    },
    "tonamn-portfolio": {
        type: "web",
        media: ["https://res.cloudinary.com/dmg2dllnz/image/upload/v1744003330/tp_1_kvqwr8.avif",
                "https://res.cloudinary.com/dmg2dllnz/image/upload/v1744003330/tp_2_bqn134.avif",
                "https://res.cloudinary.com/dmg2dllnz/image/upload/v1744003331/tp_3_ncjawd.avif",
                "https://res.cloudinary.com/dmg2dllnz/image/upload/v1744003331/tp_4_rsly0j.avif",
                "https://res.cloudinary.com/dmg2dllnz/image/upload/v1744003331/tp_5_ng31at.avif"],
        width: 3840,
        height: 2240,
        alt: "Tonamn portfolio media",
        site: "https://tonamn.github.io/tonamn-portfolio/",
        copy: {
            type: "media", 
            src : "https://res.cloudinary.com/dmg2dllnz/image/upload/v1744003330/tp_0_fwfboc.avif",
            width: 2654,
            height: 882
        }
    },
    "broked": {
        type: "demo",
        media: ["https://youtube.com/embed/HwFZy7ydrKM?feature=share"],
        alt: "Broked demo",
        site: null,
        copy: "This app was created in order to track budgets. The creator had a curiousity whether his money actually disappeared into thin air so he created this app in order to test out the following theorem."
    },
    "imaudible": {
        type: "web",
        media: ["https://res.cloudinary.com/dmg2dllnz/image/upload/v1744003058/ia_0_yjhf2w.avif",
                "https://res.cloudinary.com/dmg2dllnz/image/upload/v1744003058/ia_1_kmj0nm.avif",
                "https://res.cloudinary.com/dmg2dllnz/image/upload/v1744003058/ia_2_cui2ju.avif",
                "https://res.cloudinary.com/dmg2dllnz/image/upload/v1744003058/ia_3_wwcjpz.avif",
                "https://res.cloudinary.com/dmg2dllnz/image/upload/v1744003058/ia_4_erckfq.avif"],
        width: 3840,
        height: 2240,
        site: "https://imaudible.netlify.app/",
        alt: "ImAudible media",
        copy: "ImAudible (Image Audible) gallery is an online 3d gallery which users can navigate, view and listen to generative audio generated from images. This is a UI as part of my final year project. All images are not made by me. You can also read more about the project within the gallery introduction."
    },
    "askdoc" : {
        type: "web",
        media: ["https://res.cloudinary.com/dmg2dllnz/image/upload/v1744002644/askdoc_0_ri6t1w.avif",
                "https://res.cloudinary.com/dmg2dllnz/image/upload/v1744002644/askdoc_1_ujpas9.avif",
                "https://res.cloudinary.com/dmg2dllnz/image/upload/v1744002644/askdoc_2_zrxdym.avif",
                "https://res.cloudinary.com/dmg2dllnz/image/upload/v1744002644/askdoc_3_quh6ym.avif",
                "https://res.cloudinary.com/dmg2dllnz/image/upload/v1744002645/askdoc_4_eexr6a.avif",
                "https://res.cloudinary.com/dmg2dllnz/image/upload/v1744002645/askdoc_5_cnigbb.avif"],
        src: "https://github.com/phantomcorn/AskDoc",
        alt: "AskDoc media",
        copy: `Problem: A non-computing 
            student may seek urgent help where the question requires further elaboration or difficult 
            to explain on Imperial forum (EdStem) or even ones that require practical examples in order to 
            get the gist of the problem.
            \n
            Solution: MERN stack web app to assist non-computing students with 
            computing-related assignments. Assisting is done via matching system followed by an in-person meetup.`
    }
}

export default projects