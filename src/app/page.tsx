import ClientShell from "@/components/ClientShell";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Projects from "@/sections/Projects";
import Education from "@/sections/Education";
import Certifications from "@/sections/Certifications";
import Contact from "@/sections/Contact";
import Footer from "@/components/Footer";
import { getSiteData } from "@/lib/github";

export const revalidate = 3600;

export default async function Home() {
  const data = await getSiteData();

  return (
    <ClientShell data={data}>
      <Hero github={data.github} totalStars={data.totalStars} />
      <About github={data.github} />
      <Skills languages={data.languages} />
      <Projects projects={data.projects} />
      <Education />
      <Certifications />
      <Contact github={data.github} />
      <Footer github={data.github} />
    </ClientShell>
  );
}
