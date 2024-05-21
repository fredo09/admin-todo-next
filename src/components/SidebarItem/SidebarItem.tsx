'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
    path: string,
    icon: React.ReactNode,
    title: string
}

export const SidebarItem = ( { path, icon, title }: Props ) => {

    const currentPath = usePathname();


    return (
        <>
            <li>
              <Link href={path} 
                className={`${currentPath === path ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400': ''} 
                px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group
                `}>
                { icon }
                <span className="-mr-1 font-medium">{title}</span>
              </Link>
            </li>
        </>
    );
}