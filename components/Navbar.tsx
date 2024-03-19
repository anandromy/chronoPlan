import { getServerSession } from "next-auth"
import Link from "next/link"

export const Navbar = async () => {

    const user = await getServerSession()
    if(!user){
        return(
            <div className="flex flex-row justify-between px-6 py-3">
                <Link href="/" className="text-3xl font-bold">Chrono</Link>
                <Link href="/auth/signin" className="py-2 px-3 font-semibold bg-[var(--primary)] text-[var(--primary-foreground)] rounded-[var(--radius)]">Signin</Link>
            </div>    
        )
    }
    return(
        <div className="py-3 px-6 flex flex-row justify-between">
            <Link href="/" className="text-3xl font-bold">Chrono</Link>
            <img src={`${user.user?.image}`} className="rounded-full w-10"/>
        </div>
    )
}