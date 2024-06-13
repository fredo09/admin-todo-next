/**
 * Recueprar info del usuario mediante client
 */
"use client"

import { useEffect } from 'react';
import Image from 'next/image';
//* use Sesion para client side con next-auth v4
import { useSession } from 'next-auth/react';


export default function ProfilePage() {
    const { data: sesion } = useSession();
    console.log("🚀 ~ ProfilePage ~ sesion:", sesion)

    useEffect(() => {
        console.log('Client Side');
    }, [])

    return (
        <div className="bg-gray-200 font-sans h-screen w-full flex flex-row justify-center items-center">
            <div className="card w-96 mx-auto bg-white  shadow-xl hover:shadow">
                <Image
                    className="w-32 mx-auto rounded-full -mt-20 border-8 border-white" 
                    src={ 
                        sesion?.user?.image 
                        ?? 'https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp'
                     }
                    alt="image profile"
                    height={50}
                    width={50}/>
                    <div className="text-center mt-2 text-3xl font-medium">
                        { 
                            sesion?.user?.name ?? 'Use Customs'
                        }
                    </div>
                    <div className="text-center mt-2 font-light text-sm">
                        {
                            sesion?.user?.email ?? 'Correo no existente' 
                        }
                    </div>
                <div className="text-center mt-2 font-light text-sm">
                    {
                        sesion?.user?.roles?.join(',') ?? ['client']
                    }
                </div>
                    <div className="px-6 text-center mt-2 font-light text-sm">
                        <p>
                            Front end Developer, avid reader. 
                            Love to take a long walk, swim
                        </p>
                    </div>
                    <hr className="mt-8" />
            </div>
        </div>
    );
}