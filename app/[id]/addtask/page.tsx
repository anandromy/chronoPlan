import { Input } from "@/components/ui/input"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"

const AddTaskPage = async ({ params }: { params: { id: string }}) => {

    return(
        <div className="container">
            <form action={async (data) => {
                'use server'
                await updateProject(data, params.id)
            }} className="flex flex-col justify-center items-start gap-5">
                <Input placeholder="Write the task name" name="task-name" />
                <div className="flex flex-row items-center gap-16 justify-between w-full">
                    <label className="w-1/2">Start Date</label>
                    <Input type="date"name="start-date" />
                </div>
                <div className="flex flex-row items-center gap-16 justify-between w-full">
                    <label className="w-1/2">Due Date</label>
                    <Input type="date" name="due-date" />
                </div>
                <div className="flex flex-row items-center gap-16 justify-between w-full">
                    <label className="w-1/2">Start Time</label>
                    <Input type="time" name="start-time" />
                </div>
                <div className="flex flex-row items-center gap-16 justify-between w-full">
                    <label className="w-1/2">Due Time</label>
                    <Input type="time" name="due-time" />
                </div>
                <button className="mx-auto hover:bg-[var(--muted)] p-3 rounded">Create</button>
            </form>
        </div>
    )
}

export default AddTaskPage

async function updateProject(data: FormData, projectId: string){
    'use server'
    const session = await getServerSession()
    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email as string
        }
    })

    const start = formatStringToDateTime({
        dateStr: data.get('start-date') as string,
        timeStr: data.get('start-time') as string
    })

    const due = formatStringToDateTime({
        dateStr: data.get('due-date') as string,
        timeStr: data.get('due-time') as string
    })

    await prisma.task.create({
        data: {
            startDate: start,
            startTime: start,
            dueDate: due,
            dueTime: due,
            project: { connect: { id: projectId }},
            user: { connect: {id: user?.id }},
            name: data.get('task-name') as string
        }
    })
    revalidatePath('/home')
}




type formatStringToDateTimeProps = {
    timeStr: string,
    dateStr: string
}

function formatStringToDateTime({ timeStr, dateStr }: formatStringToDateTimeProps){

    const h = parseInt(timeStr.split(':')[0])
    const mins = parseInt(timeStr.split(':')[1])
    const year = parseInt(dateStr.split('-')[0])
    const month = parseInt(dateStr.split('-')[1]) - 1
    const day = parseInt(dateStr.split('-')[2])

    const date = new Date(year, month, day, h, mins)

    return date
}