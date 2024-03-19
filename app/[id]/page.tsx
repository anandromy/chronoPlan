import prisma from "@/lib/prisma"

type ProjectPageParams = {
    params: {
        id: string
    }
}
const ProjectPage = async ({ params }: ProjectPageParams) => { 

    const project = await prisma.project.findUnique({
        where: {
            id:  params.id
        }
    })

    return(
        <div className="container">
            Hey I'm the project page of {project?.name}
        </div>
    )
}

export default ProjectPage