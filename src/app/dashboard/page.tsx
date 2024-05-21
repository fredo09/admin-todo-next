import { redirect } from "next/navigation";

export default function DashboardPage() {

  redirect('/dashboard/rest-todo');

  return (
    <>
      <h1>Home Page 🚀 </h1>
    </>
  );
}