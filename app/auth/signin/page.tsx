"use client"
import { BuiltInProviderType } from "next-auth/providers/index"
import { getProviders, signIn, ClientSafeProvider, LiteralUnion, getSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function SignIn() {
  
  const [ providers, setProviders ] = useState({} as Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>)
  const router = useRouter()

  useEffect(() => {
    async function getAuthProvider(){
      const session = await getSession()
      if(session){
        router.push("/home")
      }
      const authProviders = await getProviders()
      if(authProviders){
        setProviders(authProviders)
      }
    }
    getAuthProvider()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)} className="py-3 px-6 font-semibold bg-[var(--primary)] text-[var(--primary-foreground)] rounded-[var(--radius)] hover:-translate-y-1 transition duration-300 ease-in-out">
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
}

