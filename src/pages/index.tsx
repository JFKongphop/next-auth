import Head from 'next/head'
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import { NextPageContext } from 'next';
import Image from 'next/image';

export default function Home() {

  const { data: session } = useSession();

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-3xl">
          {session ? (
              <div 
                className="flex flex-col justify-center items-center"
              >
                <h3>{session.user?.name}</h3>
                <img 
                  src={session?.user?.image as string} 
                  alt="profile"
                  className="w-32 h-32 rounded-full"
                />
              </div>
            ) : (
              <div className="">
                <h1>welcome to next auth application</h1>
              </div>
            )
          }
        </h1>
        {
          session ? (
            <button 
              onClick={() => signOut()}
              className="bg-blue-400"
            >
              Sign out
            </button>
          ) : (
            <button
              onClick={() => signIn()}
              className="bg-blue-400"
            >
              Sign In
            </button>
          )
        }
      </div>
    </>
  )
}

export async function getServerSideProps (ctx: NextPageContext) {
  const session = await getSession(ctx);
  console.log(session);

  return {
    props: {
      session
    },
  }
}
