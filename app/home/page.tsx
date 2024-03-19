import { Projects } from "@/components/Projects";

export default function HomePage(){
    return(
        <div className="min-h-screen flex flex-row justify-center container mx-auto">
            <div id="widgets" className="flex-1 grid grid-cols-2 gap-5">
                <div className="h-[400px] border border-[var(--border)] rounded-[var(--radius)]">
                </div>
                <div className="h-[400px] border border-[var(--border)] rounded-[var(--radius)]">
                 <Projects />   
                </div>
            </div>
        </div>
    )
}