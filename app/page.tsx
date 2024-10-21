import ThemeProvider from "../main-components/ThemeProvider";
import LoginForm from "../main-components/LoginForm";
import Transition from "../main-components/TransitionTest";
import HomePage from "../main-components/HomePage";
import LandingMain from "../main-components/LandingPage/LandingMain";

export default async function Home() {
  //const testPrisma = await fetchTestWorkflowsPerUser("malewoodev")
  return (
    <main className="flex flex-col">
      <LandingMain />
    </main>
  );
}
