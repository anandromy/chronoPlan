import { Input } from "@/components/ui/input"
import prisma from "@/lib/prisma"
import { Todos } from "@/components/Todos"
import { Plus } from "lucide-react"

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
        <div className="">
            <form action={async (data: FormData) => {
                'use server'
                const project = await prisma.project.update({
                    where: {
                        id: params.id,
                    },
                    data: {
                        name: data.get('project-name') as string
                    }
                })
            }} className="p-3">
                <Input defaultValue={project?.name} name="project-name" className="border-0 hover:border text-xl focus:border"/>
            </form>
            <hr className="border border-[var(--border)] my-2"></hr>
            <div className="main contains all the done, doing, and todo">
                <div className="hover:bg-[var(--muted)] rounded-[var(--radius)] px-6 py-3">
                    <div className="flex flex-row items-center gap-2">
                        <h1 className="text-lg">Todos</h1>
                        <button className="hover:bg-[var(--muted)] p-2 rounded-[var(--radius)]">
                            <Plus size={20}/>
                        </button>
                    </div>
                    <Todos projectId={project?.id || ''}/>
                </div>
            </div>
        </div>
    )
}

export default ProjectPage

