
import LandingMain from "../main-components/LandingPage/LandingMain";
import "./globals.css";

export default function Home() {
  //const testPrisma = await fetchTestWorkflowsPerUser("malewoodev")
  return (
    <main className="flex flex-col">
      <LandingMain />
    </main>
  );
}
