
/* The portfolio grid lists projects in the order they appear here */
const projects = {
    "broked": {
        title: "Broked",
        variant: "color2", /* Button colour on the portfolio grid */
        type: "demo",
        media: ["https://youtube.com/embed/HwFZy7ydrKM?feature=share"],
        alt: "Broked demo",
        site: null,
        copy: "This app was created in order to track budgets. The creator had a curiousity whether his money actually disappeared into thin air so he created this app in order to test out the following theorem."
    },
    "askdoc" : {
        title: "AskDoc",
        variant: "color3", /* Button colour on the portfolio grid */
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
    },

    "cat": {
        title: "CAT",
        variant: "color2", /* Button colour on the portfolio grid */
        type: "web",
        media: [
            "https://res.cloudinary.com/dmg2dllnz/image/upload/v1794806358/cat_0_zzqc0f.avif",
            "https://res.cloudinary.com/dmg2dllnz/image/upload/v1794806358/cat_1_v3ldcu.avif",
            "https://res.cloudinary.com/dmg2dllnz/image/upload/v1794806358/cat_3_kyc2nd.avif",
            "https://res.cloudinary.com/dmg2dllnz/image/upload/v1794806358/cat_4_cso0n3.avif",
            "https://res.cloudinary.com/dmg2dllnz/image/upload/v1794806360/cat_5_hvfkwm.avif",
            "https://res.cloudinary.com/dmg2dllnz/image/upload/v1794806359/cat_6_grbyff.avif"
        ],
        alt: "Cyber Attack Toolchain media",
        copy: "Top teams to score above 80% in the project."
    },
    "imaudible": {
        title: "ImAudible Gallery",
        variant: "color1", /* Button colour on the portfolio grid */
        type: "fyp",
        media: ["https://res.cloudinary.com/dmg2dllnz/image/upload/v1765703694/imaudible_fygqls.avif",
                "https://res.cloudinary.com/dmg2dllnz/image/upload/v1744003058/ia_0_yjhf2w.avif",
                "https://res.cloudinary.com/dmg2dllnz/image/upload/v1744003058/ia_1_kmj0nm.avif",
                "https://res.cloudinary.com/dmg2dllnz/image/upload/v1744003058/ia_2_cui2ju.avif",
                "https://res.cloudinary.com/dmg2dllnz/image/upload/v1744003058/ia_3_wwcjpz.avif",
        ],
        width: 3840,
        height: 2240,
        site: "https://imaudible.netlify.app/",
        alt: "ImAudible media",
        copy: "ImAudible (Image Audible) gallery is an online 3d gallery which users can navigate, view and listen to generative audio generated from images. This is a UI as part of my final year project. All images are not made by me. You can also read more about the project within the gallery introduction."
    },
    "oasis-residence": {
        title: "Oasis Residence",
        variant: "color4", /* Button colour on the portfolio grid */
        type: "web",
        media: ["https://res.cloudinary.com/dmg2dllnz/image/upload/v1744003525/or_1_pobzem.avif",
                "https://res.cloudinary.com/dmg2dllnz/image/upload/v1744003525/or_2_rbgpxc.avif",
                "https://res.cloudinary.com/dmg2dllnz/image/upload/v1744003526/or_3_hwzbns.avif",
                "https://res.cloudinary.com/dmg2dllnz/image/upload/v1744003526/or_4_jyg1zm.avif"],
        width: 3840,
        height: 2240,
        alt: "Oasis residence media",
        site: "https://oasisresidence.netlify.app/",
        copy: '"It ain\'t much but it\'s honest work." \n A web development based on a friend\'s figma Hi-Fi.'
    },
    "tonamn-portfolio": {
        title: "Tonamn Portfolio",
        variant: "color3", /* Button colour on the portfolio grid */
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
    "nvfact_dg" : {
        title: "NVFACT",
        variant: "color3", /* Button colour on the portfolio grid */
        type: "design_guideline",
        media: ["https://res.cloudinary.com/dmg2dllnz/image/upload/v1765769868/nvfact_dg_1_w7c1vj.png",
            "https://res.cloudinary.com/dmg2dllnz/image/upload/v1765769868/nvfact_dg_2_leiidf.png",
            "https://res.cloudinary.com/dmg2dllnz/image/upload/v1765769869/nvfact_dg_3_rhwexu.png",
            "https://res.cloudinary.com/dmg2dllnz/image/upload/v1765769869/nvfact_dg_4_jxcvlo.png",
            "https://res.cloudinary.com/dmg2dllnz/image/upload/v1765769869/nvfact_dg_5_xgkp58.png",
            "https://res.cloudinary.com/dmg2dllnz/image/upload/v1765769869/nvfact_dg_6_yxdp7f.png",
            "https://res.cloudinary.com/dmg2dllnz/image/upload/v1765769870/nvfact_dg_7_ot6vzq.png",
            "https://res.cloudinary.com/dmg2dllnz/image/upload/v1765769870/nvfact_dg_8_mnjuyl.png",
            "https://res.cloudinary.com/dmg2dllnz/image/upload/v1765769871/nvfact_dg_9_dcrayv.png",
            "https://res.cloudinary.com/dmg2dllnz/image/upload/v1765769871/nvfact_dg_10_kjxx2g.png",
            "https://res.cloudinary.com/dmg2dllnz/image/upload/v1765769872/nvfact_dg_11_ur7chu.png"
        ],
        alt: "NVFACT design guideline media",
        copy: `NVFACT is a joint venture attempt at localising smart factory solution in Thailand with Moornmo, a leading smart factory company from Korea. The guideline takes inspiration from Apple's minimal and creative aesthetic. The use of color is taken based off of Moornmo's current logo adjusted in shades. Logo designed by @tonnamvasikanond.`
    },
    "silly_bean": {
        title: "Silly Bean",
        variant: "color1", /* Button colour on the portfolio grid */
        type: "web",
        src: "https://sillybean.netlify.app/",
        media: [
            "https://res.cloudinary.com/dmg2dllnz/image/upload/v1794807072/bean_0_qguwnc.avif",
            "https://res.cloudinary.com/dmg2dllnz/image/upload/v1794807072/bean_1_ajgczb.avif",
            "https://res.cloudinary.com/dmg2dllnz/image/upload/v1794807073/bean_2_tfjuwu.avif",
            "https://res.cloudinary.com/dmg2dllnz/image/upload/v1794807073/bean_3_h22qpj.avif"
        ],
        alt: "Silly Bean media",
        copy: "ERC-20 Token (BEAN) with staking pool and prediction market using oracle feed. Note: Education purpose"
    },
    "pyro_cryo": {
        title: "Pyro Cryo",
        variant: "color4", /* Button colour on the portfolio grid */
        type: "web",
        
        copy: "Stripe-style payment gateway written in Java Spring Boot. Easily integrate your server to ours through RESTful APIs. Includes blockchain watcher, confirms payment and handles chain reorganization."
    }
}

export default projects