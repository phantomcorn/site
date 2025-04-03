
const projects = {
    "oasis-residence": {
        type: "web",
        media: ["https://res.cloudinary.com/dmg2dllnz/image/upload/v1742792906/1_usltrk.png",
                "https://res.cloudinary.com/dmg2dllnz/image/upload/v1742792905/2_ffv6vt.png",
                "https://res.cloudinary.com/dmg2dllnz/image/upload/v1742792906/3_v59jyd.png",
                "https://res.cloudinary.com/dmg2dllnz/image/upload/v1742792904/4_mkamff.png"],
        width: 3840,
        height: 2240,
        alt: "Oasis residence media",
        site: "https://oasisresidences.netlify.app/",
        copy: '"It ain\'t much but it\'s honest work."'
    },
    "tonamn-portfolio": {
        type: "web",
        media: ["https://res.cloudinary.com/dmg2dllnz/image/upload/v1742821119/tp_0_budhvp.png",
                "https://res.cloudinary.com/dmg2dllnz/image/upload/v1742821120/tp_1_a1qemr.png",
                "https://res.cloudinary.com/dmg2dllnz/image/upload/v1742821123/tp_2_t5q4ps.png",
                "https://res.cloudinary.com/dmg2dllnz/image/upload/v1742821120/tp_3_qqbn5x.png",
                "https://res.cloudinary.com/dmg2dllnz/image/upload/v1742821120/tp_4_y5ret3.png",
                "https://res.cloudinary.com/dmg2dllnz/image/upload/v1742821120/tp_5_x2f1fn.png"],
        width: 3840,
        height: 2240,
        alt: "Tonamn portfolio media",
        site: "https://tonamn.github.io/tonamn-portfolio/",
        copy: {
            type: "media", 
            src : "https://res.cloudinary.com/dmg2dllnz/image/upload/v1743006701/tp_0_cin9oz.png",
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
        media: ["https://res.cloudinary.com/dmg2dllnz/image/upload/v1742911883/ia_0_lwcvrb.png",
                "https://res.cloudinary.com/dmg2dllnz/image/upload/v1742911883/ia_1_dydiev.png",
                "https://res.cloudinary.com/dmg2dllnz/image/upload/v1742911883/ia_2_v4yo6j.png",
                "https://res.cloudinary.com/dmg2dllnz/image/upload/v1742911883/ia_3_qibjzr.png",
                "https://res.cloudinary.com/dmg2dllnz/image/upload/v1742911882/ia_4_wxg4ow.png"],
        width: 3840,
        height: 2240,
        site: "https://imaudible.netlify.app/",
        alt: "ImAudible media",
        copy: "ImAudible (Image Audible) gallery is an online 3d gallery which users can navigate, view and listen to generative audio generated from images. This is a UI as part of my final year project. All images are not made by me. You can also read more about the project within the gallery introduction."
    },
    "askdoc" : {
        type: "web",
        media: ["https://res.cloudinary.com/dmg2dllnz/image/upload/v1743699003/askdoc_0_sg6izi.png",
                "https://res.cloudinary.com/dmg2dllnz/image/upload/v1743699002/askdoc_1_pkedcj.png",
                "https://res.cloudinary.com/dmg2dllnz/image/upload/v1743699001/askdoc_2_lekwje.png",
                "https://res.cloudinary.com/dmg2dllnz/image/upload/v1743699003/askdoc_3_f0fk1n.png",
                "https://res.cloudinary.com/dmg2dllnz/image/upload/v1743699005/askdoc_4_xgwc8s.png",
                "https://res.cloudinary.com/dmg2dllnz/image/upload/v1743699004/askdoc_5_apjkud.png"],
        src: "https://github.com/phantomcorn/AskDoc",
        alt: "AskDoc media",
        copy: `Problem: A non-computing 
            student may seek urgent help where the question requires further elaboration or difficult 
            to explain on Imperial forum (EdStem) or even ones that require practical examples in order to 
            get the gist of the problem.

            Solution: MERN stack web app to assist non-computing students with 
            computing-related assignments. Assisting is done via matching system followed by an in-person meetup.`
    }
}

export default projects