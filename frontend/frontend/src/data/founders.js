import sabinImage from "../assets/team/sabin.png";
import carinaImage from "../assets/team/carina.png";

const founders = [
    {
        id: 1,
        image: sabinImage,

        name: "Sabin",
        age: 17,
        hobby: "Coding",
        movie: "Good Will Hunting",

        description:
            "I study at Saint Sava National Highschool which represents a really important part of me. I like to think of myself as an ambitious person. For example, I qualified for the national stage of the <em>ROAI</em> competition. On the Weekends, I like to go out with my friends.",

        skills: [
            "Python",
            "Sklearn",
            "NumPy",
            "Pandas",
            "SciPy",
            "LaTeX"
        ]
    },

    {
        id: 2,
        image: carinaImage,

        name: "Carina",
        age: 17,
        hobby: "Drawing",
        movie: "Shutter Island",

        description:
            "I started this project with the hope that I'll meet more people passionate about ML and AI and because of the motivation obtained after qualifying at national stage at <em>ONIA</em>. In my free time I like to do graphic design and CGI models in blender for companies! My favourite part about myself is my attention to details and my sense of creativity.",

        skills: [
            "Python",
            "C++",
            "HTML & CSS",
            "Blender",
            "Graphic design"
        ]
    }
];

export default founders;