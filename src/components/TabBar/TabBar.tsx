'use client';

import { setCookie } from 'cookies-next';
import React, { useState } from 'react';

interface Props {
    currentTab? : number,
    TabOptions? : number[]
}

export const TabBar = ({ TabOptions = [1,2,3,4], currentTab = 1 }: Props ) => {
    const [tabOption, setTabOption] = useState(currentTab);

    const onTabSeleted = ( tabSelected: number ) => {
        console.log("🚀 ~ onTabSeleted ~ tabSelected:", tabSelected);
        
        setTabOption(tabSelected);

        //* Set cookies
        setCookie('tabSelected', tabOption );
    };

    return (
        <div 
            className={`
                grid w-full space-x-2 rounded-xl bg-gray-200 p-2 mt-3
                ${'grid-cols-'+TabOptions.length }
                `}>
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
