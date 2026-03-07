import Image from "next/image";
import HeroSection from "@/components/heroSection/HeroSection";
import TopCategories from "@/components/topCategories/TopCategories";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center  mt-2 p-0" >
      <main className="w-full ">
       <HeroSection />
        <TopCategories />
      </main>
    </div>
  );
}
