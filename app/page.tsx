

import ThemeProvider from "./main-components/ThemeProvider"
import LoginForm from "./main-components/LoginForm"
import Transition from "./main-components/TransitionTest"


export default async function Home() {
  //const testPrisma = await fetchTestWorkflowsPerUser("malewoodev")
  return (
    <main className="flex flex-col  " >
      <div className="flex justify-end w-full">
        
      <ThemeProvider/>
      </div>
      
      <div className="flex justify-center h-[90vh]  items-center" >
        <Transition/>
        
      </div>
    </main>
  )
}
