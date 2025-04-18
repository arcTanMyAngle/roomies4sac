import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import NavigationBar from "@/components/navigation-bar"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white">
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Roomie4Sac</h1>
          <p className="text-xl text-gray-600">Find your perfect Sacramento State roommate</p>
        </div>

        <div className="relative w-full max-w-md h-80 mb-8">
          <Image
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1470&auto=format&fit=crop"
            alt="Roommates finding each other"
            fill
            className="object-cover rounded-lg shadow-lg"
            priority
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary to-transparent h-1/3 rounded-b-lg flex items-end p-4">
            <div className="text-white font-semibold">
              <p className="text-lg">SAC STATE</p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-xs space-y-4">
          <Link href="/swipe" className="w-full">
            <Button className="w-full" size="lg">
              Get Started
            </Button>
          </Link>
        </div>
      </div>

      <NavigationBar />

      <footer className="py-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Roomies4Sac - Sacramento State University
      </footer>
    </div>
  )
}
