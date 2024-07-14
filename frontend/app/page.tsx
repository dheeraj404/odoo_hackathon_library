import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <section className="space-y-4">
        <img src="/illustration.png" alt="Reading Illustration" className="max-h-36 max-w-36"/>
        <h1 className="text-6xl font-bold">Library Management System</h1>
        <p className="text-lg ml-2 font-semibold">
        Your Gateway to Seamless Library Management
        </p>
        <div className="grid grid-cols-3 items-center gap-4">
          <Link href="/register/library" className="text-lg font-medium border rounded-lg p-3 flex justify-center bg-primary text-secondary hover:opacity-95 transition-all ease-in-out hover:scale-105">
            Register your Library
          </Link>          
          <Link href="/login" className="text-lg font-medium border rounded-lg p-3 flex justify-center bg-primary text-secondary hover:opacity-95 transition-all ease-in-out hover:scale-105">
            Login
          </Link>
          <Link href="/register/user" className="text-lg font-medium border rounded-lg p-3 flex justify-center bg-primary text-secondary hover:opacity-95 transition-all ease-in-out hover:scale-105">
            Register as a User
          </Link>          
        </div>
      </section>
    </div>
  )
}
