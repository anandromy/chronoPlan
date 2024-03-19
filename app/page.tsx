import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {

  const user = await getServerSession()
  if(user){
    redirect("/home")
  }
  return(
    <div className="flex items-center justify-center">
      <h1 className="text-5xl font-bold">Landing Page</h1>
    </div>
  )
}
