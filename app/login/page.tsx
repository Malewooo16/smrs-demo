import LoginForm from "../../main-components/LoginForm";
import ThemeProvider from "../../main-components/ThemeProvider";

export default function Login() {
  return (
    <main className="flex flex-col  ">
      <div className="flex justify-end w-full">
        <ThemeProvider />
      </div>

      <div className="flex justify-center h-[90vh]  items-center">
        <LoginForm />
      </div>
    </main>
  );
}
