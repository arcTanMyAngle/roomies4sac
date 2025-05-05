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
          <p className="text-xl text-balance text-gray-600">
            Find your perfect! 
            <br />
            Roomie4Sac is a platform that connects students at Sacramento State with potential roommates.
            <br />
          </p>
        </div>

        <div className="relative w-full max-w-md h-80 mb-8">
          <Image
            src="/images/landing.jpg"
            alt="Roommates finding each other"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
            className="object-cover rounded-lg shadow-lg"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary to-transparent h-1/3 rounded-b-lg flex items-end p-4">
            <div className="text-white font-semibold">
              <p className="text-lg">SAC STATE</p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-xs space-y-4">
          <Link href="/swipe" className="w-full" prefetch={true}>
            <Button className="w-full hover:bg-yellow-500 hover:text-green-900" size="lg">
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
