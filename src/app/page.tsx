import { redirect } from "next/navigation";

export default function HomePage() {

  redirect('/dashboard');

  // return (
  //   <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
  //     <h1 className="text-4xl">HOLA DAHSBOARD 🚀 </h1>
  //   </div>
  // );
}
