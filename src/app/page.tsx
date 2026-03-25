import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import LandingPage from "@/components/home/LandingPage"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <LandingPage />
      </main>
      <Footer />
    </>
  )
}
