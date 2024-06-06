'use client';

import React, { useState } from 'react';
import { setCookie } from 'cookies-next';
import { useRouter } from "next/navigation";

interface Props {
    currentTab? : number,
    TabOptions? : number[]
}

export const TabBar = ({ TabOptions = [1,2,3,4]}: Props ) => {
    const route = useRouter()
    const [tabOption, setTabOption] = useState(1);
    
    const onTabSeleted = ( tabSelected: number ) => {
        console.log("🚀 ~ onTabSeleted ~ tabSelected:", tabSelected);
        
        console.log("🚀 ~ TabBar ~ tabOption:", tabOption)
        setTabOption(tabSelected);

        //* Set cookies
        setCookie('tabSelected', tabOption.toString() );
        route.refresh();
    };

    return (
        <div className={` grid w-full space-x-2 rounded-xl bg-gray-200 p-2 mt-3 grid-cols-4`}>
            {
                TabOptions.map( tab => (
                    <div key={ tab }>
                        <input 
                            type="radio"
                            checked={ tabOption === tab }
                            onChange={() => console.log('onChenge')}
                            id={ tab.toString() }
                            className="peer hidden" />
                        <label
                            onClick={ () => onTabSeleted(tab) }
                            className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
                            { tab }
                        </label>
                    </div>
                ))
            }
        </div>
    );
};
