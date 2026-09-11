import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ChairmansMessage from "@/components/Chairmansmessage";
import Journey from "@/components/Journey";
import PracticeAreas from "@/components/PracticeAreas";
import VisionMission from "@/components/VisionMission";
import OurApproach from "@/components/OurApproach";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import SeamPin from "@/components/SeamPin";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <SeamPin
        bufferVh={70}
        stageClassName="bg-charcoal"
        outgoing={<ChairmansMessage />}
        incoming={<Journey />}
      />
      <PracticeAreas />
      <VisionMission />
      <SeamPin
        bufferVh={70}
        stageClassName="bg-cream"
        outgoing={<OurApproach />}
        incoming={<Achievements />}
      />
      <Contact />
    </main>
  );
}