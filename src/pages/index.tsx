import Head from "next/head"
import Image from "next/image"

export default function Home() {
  return (
    <div className="px-2 flex flex-col justify-center items-center h-screen">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="px-20 flex-1 flex flex-col justify-center items-center">
        <h1 className="text-6xl font-bold">
          Welcome to{" "}
          <a
            href="https://nextjs.org"
            className="text-blue-500 hover:underline"
          >
            Next.js!
          </a>
        </h1>

        <p className="text-xl m-10">
          Get started by editing{" "}
          <code className="p-3 bg-gray-50 rounded">pages/index.js</code>
        </p>

        <div className="flex justify-center items-center flex-wrap">
          <a
            href="https://nextjs.org/docs"
            className="m-4 p-6 border border-gray-200 rounded-xl w-2/5 hover:border-blue-500 hover:text-blue-500"
          >
            <h2 className="text-xl">Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a
            href="https://nextjs.org/learn"
            className="m-4 p-6 border border-gray-200 rounded-xl w-2/5 hover:border-blue-500 hover:text-blue-500"
          >
            <h2 className="text-xl">Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className="m-4 p-6 border border-gray-200 rounded-xl w-2/5 hover:border-blue-500 hover:text-blue-500"
          >
            <h2 className="text-xl">Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className="m-4 p-6 border border-gray-200 rounded-xl w-2/5 hover:border-blue-500 hover:text-blue-500"
          >
            <h2 className="text-xl">Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className="flex justify-center items-center w-full h-20 border-t border-gray-200">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  )
}
