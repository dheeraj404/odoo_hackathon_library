import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <section className="space-y-4">
        <h1 className="text-6xl font-bold">Library Management System</h1>
        <p className="text-lg ml-2">
        Your Gateway to Seamless Library Management
        </p>
        <div className="grid grid-cols-2 items-center gap-4">
          <Link href="/register" className="text-lg font-medium border rounded-lg p-3 flex justify-center bg-primary text-secondary hover:opacity-95 transition-all ease-in-out hover:scale-105">
            Register your Library
          </Link>          
          <Link href="/login" className="text-xl font-medium border rounded-lg p-3 flex justify-center bg-primary text-secondary hover:opacity-95 transition-all ease-in-out hover:scale-105">
            Login
          </Link>
        </div>
      </section>
    </div>
  )
}
