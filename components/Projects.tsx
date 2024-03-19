import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import Link from "next/link"

export const Projects = async () => {

    const session = await getServerSession()
    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email || ''
        }
    })

    const projects = await prisma.project.findMany({
        where: {
            userId: user?.id
        }
    })
    return(
        <div className="p-6">
            <h1 className="font-semibold text-xl mb-3">Projects</h1>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <Link href="/addproject" className="hover:bg-[var(--muted)] px-3 py-4 rounded-[var(--radius)]">Create project</Link>
                    {
                        projects.map((project) => (
                            <Link key={project.id} href={`/${project.id}`} className="hover:bg-[var(--muted)] px-3 py-4 rounded-[var(--radius)]">{project.name}</Link>
                        ))
                    }
                </div>
        </div>
    )
}