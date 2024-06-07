import Image from 'next/image';
import Link from 'next/link';
import { CiLogout, CiBookmarkCheck, CiUser } from 'react-icons/ci';
import { SidebarItem } from '../SidebarItem/SidebarItem';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// items de menu
const itemsSidebar = [
  {
    path: '/dashboard/profile',
    icon: <CiUser size={30} />,
    title: 'Profile'
  },
  {
    path: '/dashboard',
    icon: <CiBookmarkCheck size={30} />,
    title: 'Dashboard'
  },
  {
    path: '/dashboard/products',
    icon: <CiBookmarkCheck size={30} />,
    title: 'productos'
  },
  {
    path: '/dashboard/rest-todo',
    icon: <CiBookmarkCheck size={30} />,
    title: 'Rest Todo'
  },
  {
    path: '/dashboard/server-actions',
    icon: <CiBookmarkCheck size={30} />,
    title: 'Server actions'
  },
  {
    path: '/dashboard/cookies',
    icon: <CiBookmarkCheck size={30} />,
    title: 'Cookies'
  }
];

export const Sidebar = async () => {
  //* -> Recuperando la sesion del usuario
  const UserSession = await getServerSession(authOptions);
  console.log("🚀 ~ Sidebar ~ UserSession:", UserSession);

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          {/* TODO: Next/Link hacia dashboard */}
          <Link href="#" title="home">
            {/* Next/Image */}
            <Image 
              src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
              className="w-32" 
              alt="tailus logo"
              width={40} 
              height={40} />
          </Link>
        </div>

        <div className="mt-8 text-center">
          {/* Next/Image */}
          <Image
            src={
              UserSession?.user?.image
              ? UserSession?.user?.image
              : 'https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp'} 
            alt="" 
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            width={40}
            height={40}/>
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {UserSession?.user?.name ? UserSession?.user?.name : 'Custom User'}
          </h5>
          
          {/* TODO: poner el rol del admin */}
          <span className="hidden text-gray-400 lg:block">Admin</span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {/* TODO: USAR EL MAP PARA ITERAR ITEMS */}
          {
            itemsSidebar.map(({ title, path, icon }) => (
              <SidebarItem
                key={title}
                path={path}
                icon={icon}
                title={title}
              />
            ))
          }
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
          <CiLogout />
          <span className="group-hover:text-gray-700">Logout</span>
        </button>
      </div>
    </aside>
  );
}