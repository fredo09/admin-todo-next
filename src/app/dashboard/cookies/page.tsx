import { Metadata } from "next";
import { TabBar } from "@/components";
import { cookies } from 'next/headers';

export const metadata:Metadata = {
    title: "Cookies",
    description: "Cookies page"
}

export default async function CookiesPage() {
    //* setenado cookie usando funciones de next 
    const cookieStore = cookies();
    const tabCookie = Number(cookieStore.get('tab-Selected')?.value ?? '1');

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-5">
            <div className="flex flex-col">
                <span className="text-3xl"> Tabs 🍪 </span>
                <TabBar currentTab={tabCookie} />
            </div>
        </div>
    );
}