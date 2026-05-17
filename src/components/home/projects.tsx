import Project from "@/projects/project"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { IconBrandGithub, IconExternalLink } from "@tabler/icons-react"

export default function Projects() {

    const { projects } = Project();

    return (
        <div className="flex flex-col items-center justify-center w-full px-10 pb-20 mt-10 " id="projects">
            <h1 className="text-4xl font-bold text-white mb-12">Projetos</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 w-full max-w-7xl">
                {projects.map((project) => (
                    <Card key={project.name} className="bg-[#1d2d44] border-[#3e5c76] text-slate-100 overflow-hidden shadow-lg 
                    hover:shadow-[0_0_20px_rgba(62,92,118,0.4)] transition-all duration-300 flex flex-col py-0 pb-5 gap-5">

                        {project.image && (
                            <div className="w-full h-52 overflow-hidden border-b border-[#3e5c76]/50 bg-[#0b131e] flex items-center justify-center">
                                <img
                                    src={project.image}
                                    alt={project.name}
                                    className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        )}

                        <CardHeader className="flex-grow">
                            <div className="flex justify-between items-center mb-2 gap-4">
                                <CardTitle className="text-2xl font-bold text-white">{project.name}</CardTitle>
                                {project.progress === true && (
                                    <Badge variant="secondary" className="bg-[#3e5c76] text-white hover:bg-[#2b4257] whitespace-nowrap">
                                        Finalizado
                                    </Badge>
                                )}
                                {project.progress === false && (
                                    <Badge variant="secondary" className="bg-[#3e5c76] text-white hover:bg-[#2b4257] whitespace-nowrap animate-pulse
                                    items-center justify-center flex">
                                        Em andamento
                                    </Badge>
                                )}
                            </div>
                            <CardDescription className="text-slate-300 text-base leading-relaxed">
                                {project.description}
                            </CardDescription>
                        </CardHeader>

                        {project.deploy && (
                            <CardFooter className="flex gap-4 pt-4 mt-auto bg-transparent border-t-1 border-[#3e5c76]/50">
                                {project.deploy && (
                                    <Button
                                        className="flex-1 bg-[#3e5c76] text-white hover:bg-[#2b4257] cursor-pointer"
                                        onClick={() => window.open(project.deploy, "_blank")}
                                    >
                                        <IconExternalLink size={18} className="mr-2" />
                                        Acessar
                                    </Button>
                                )}
                            </CardFooter>
                        )}
                    </Card>
                ))}
            </div>
        </div>
    )
}