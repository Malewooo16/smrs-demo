import ThemeProvider from "./main-components/ThemeProvider";
import LoginForm from "./main-components/LoginForm";
import Transition from "./main-components/TransitionTest";
import HomePage from "./main-components/HomePage";

export default async function Home() {
  //const testPrisma = await fetchTestWorkflowsPerUser("malewoodev")
  return (
    <main className="flex flex-col px-4">
      <div className="flex justify-end w-full">
        <ThemeProvider />
      </div>

      <HomePage />
    </main>
  );
}
