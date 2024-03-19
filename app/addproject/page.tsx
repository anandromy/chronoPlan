import { Input } from "@/components/ui/input"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"

export default function AddProjectPage(){
    return(
        <div className="container">
            <form action={addProject} className="flex flex-col gap-5 justify-center items-stretch w-1/2 mx-auto min-w-[450px] max-w-[1200px] p-6">
                <label htmlFor="name">Project Name</label>
                <Input required aria-required name="name" />
                <button type="submit" className="border border-[var(--border)] p-2 text-center rounded-[var(--radius)]">Create Project</button>
            </form>
        </div>
    )
}


async function addProject(data :FormData){
    'use server'
    const session = await getServerSession()
    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email || ''
        }
    })

    const newProject = await prisma.project.create({
        data: {
            userId: user?.id || '',
            name: data.get('name') as string
        }
    })

    revalidatePath('/home')
}


