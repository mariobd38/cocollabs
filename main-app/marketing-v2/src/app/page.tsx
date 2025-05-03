// import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import { Features } from "@/components/features";


export default function Home() {
  return (
    <>
      <main>
        <Navbar />
        <Hero />
        <Features />
      </main>
      <Footer />
    </>
  );
}
