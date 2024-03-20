import prisma from "@/lib/prisma"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

type TodosProps = {
    projectId: string
}

export const Todos = async ({ projectId }: TodosProps) => {

    const todos = await prisma.task.findMany({
        where: {
            projectId: projectId
        }
    })

    return(
        <Table>
            <TableHeader className="hidden">
                <TableRow>
                    <TableHead>Task Name</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Add Field</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    todos.map((todo) =>(
                        <TableRow>
                            <TableCell>{todo.name}</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}