export interface Certification {
  name: string;
  image: string;
  link?: string;
}

export const certifications: Certification[] = [
  {
    name: "AWS Cloud Technical Essentials",
    image: "/certificates/aws-cloud-technical-essentials.png",
    link: "https://coursera.org/verify/NJ3W6RL6D19B",
  },
  {
    name: "Introduction to Databases for Back-End Development",
    image: "/certificates/meta-databases-backend.png",
    link: "https://coursera.org/verify/AMJP9S5HAPEC",
  },
  {
    name: "Programming in Python",
    image: "/certificates/meta-python-programming.png",
    link: "https://coursera.org/verify/0IZ8CJIQIZWG",
  },
  {
    name: "React Basics",
    image: "/certificates/meta-react-basics.png",
    link: "https://coursera.org/verify/602AFDOUN01Z",
  },
];
