// app/page.tsx
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function HomePage() {
  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <svg className="w-8 h-8 mr-2" /* Add your library icon SVG here */ />
          <h1 className="text-2xl font-bold">Public Library</h1>
        </div>
        <Button variant="outline">Sign out</Button>
      </header>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <h2 className="text-xl font-semibold mb-4">Search Books</h2>
          <div className="flex mb-8">
            <Input placeholder="Enter book name" className="mr-2" />
            <Button>Search</Button>
          </div>

          <h2 className="text-xl font-semibold mb-4">My Books</h2>
          <Card>
            <CardContent className="flex p-4">
              <img src="/book-cover.jpg" alt="Book cover" className="w-24 h-32 object-cover mr-4" />
              <div>
                <h3 className="font-semibold">Modern Development Cookbooks: Rapidly build, customize, and...</h3>
                <p className="text-sm text-gray-500 mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco...
                </p>
                <Button variant="outline" className="mt-4">Return Book</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">User Profile</h2>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center mb-4">
                <Avatar className="w-16 h-16 mr-4">
                  <AvatarImage src="/avatar.png" alt="Mitchell Admin" />
                  <AvatarFallback>MA</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">Mitchell Admin</h3>
                  <p className="text-sm text-gray-500">Your001234</p>
                </div>
              </div>
              <div className="space-y-2">
                <p><span className="font-semibold">Address:</span> Scretharper St. 120/3 San Francisc</p>
                <p><span className="font-semibold">Phone:</span> +1 555-555-5555</p>
                <p><span className="font-semibold">Email:</span> admin@yourdomain.somewhere.com</p>
                <p><span className="font-semibold">Registration:</span> #12345678900</p>
              </div>
              <h4 className="font-semibold mt-4 mb-2">Your contact</h4>
              <p>Mitchell Admin</p>
              <p>admin@yourdomain.somewhere.com</p>
              <p>+1 555-555-5555</p>
              <p>Librarian</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}