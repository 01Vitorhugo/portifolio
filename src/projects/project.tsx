import draLaylaCistina from "../assets/draLaylaCristina.jpg"
import tirarVisto from "../assets/logo_tirarVisto.png"
import queDeliciaAlimentos from "../assets/logo_queDeliciaAlimentos.png"
import flexFlix from "../assets/flexFlix.png"
import semFoto from "../assets/SemFoto.png"



export default function Project() {


    const projects = [
        {
            name: "Dra. Layla Cristina",
            description: "Projeto em andamento para uma profissional de odontologia.",
            image: draLaylaCistina,
            progress: false,
            deploy: "",
            imageMode: "cover" as const,
        },
        {
            name: "Tirar Visto",
            description: "Projeto desenvolvido para uma vaga de Desenvolvedor Front-end.",
            image: tirarVisto,
            progress: true,
            deploy: "https://tirarvisto-phi.vercel.app/",
            imageMode: "contain" as const,
        },
        {
            name: "Que delicia Alimentos",
            description: "Site feito para o escoamento de produtos de uma empresa de alimentos.",
            image: queDeliciaAlimentos,
            progress: true,
            deploy: "https://quedeliciaalimentos.com.br/",
            imageMode: "contain" as const,
        },
        {
            name: "FlexFlix",
            description: "Projeto criado para treinar react com apis externas.",
            image: flexFlix,
            progress: true,
            deploy: "https://react-filmes-beta.vercel.app/",
            imageMode: "contain" as const,
        },
        {
            name: "MKS Sistema",
            description: "Projeto desenvolvido para uma vaga de Desenvolvedor Front-end.",
            image: "",
            progress: true,
            deploy: "https://mks-desafio-three.vercel.app",
            imageMode: "contain" as const,
        },
        {
            name: "Cards",
            description: "Projeto desenvolvido para ajudar alunas de biomedicina com cartões de identificação.",
            image: "",
            progress: true,
            deploy: "https://cards-navy-xi.vercel.app",
            imageMode: "contain" as const,
        },
    ]

    const processedProjects = projects.map(project => {
        if (project.image === "") {
            return { ...project, image: semFoto };
        }
        return project;
    });

    return { projects: processedProjects };
}