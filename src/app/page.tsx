import { redirect } from "next/navigation";

export default function HomePage() {

  redirect('dashboard/rest-todo');

  // return (
  //   <div>
  //     <h1 className="text-4xl">HOLA DAHSBOARD 🚀 </h1>
  //   </div>
  // );
}
