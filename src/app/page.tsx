import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ChairmansMessage from "@/components/Chairmansmessage";
import Journey from "@/components/Journey";
import PracticeAreas from "@/components/PracticeAreas";
import VisionMission from "@/components/VisionMission";
import Achievements from "@/components/Achievements";
import ChapterWipe from "@/components/ChapterWipe";
import Contact from "@/components/Contact";
import OurApproach from "@/components/OurApproach";
export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <ChairmansMessage />
      <Journey/>
      <PracticeAreas/>
      <VisionMission/>
      <OurApproach/>
      <Achievements/>
      <Contact/>
    </main>
  );
}