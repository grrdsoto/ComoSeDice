/**
 * Modal component with the gallery of the profile pictures that the user can get. 
 */

import React from "react";
import "../../styles.css"

/**
 * Function that handles the creation of the leaderboard rows.
 * 
 * @param { users } - array which contains all the users.
 */
export default function Counter(props) {

    let users = props.users;

    let itemList=[];

    users.forEach((item, index)=>{
        itemList.push( 
        <div key={index} className="flex items-center justify-center">
            <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <img className="w-10 h-10 rounded-full" src={ item.profilePicture } alt="img"></img>
                <div className="pl-3">
                    <div className="text-base font-semibold">{ item.username }</div>
                    <div className="font-normal text-gray-500">{ item.email }</div>
                </div>
            </th>
            <td className="px-6 py-4">
                # { index + 1 }
            </td>
            <td className="px-6 py-4">
                { item.bestScore }
            </td>
            <td className="px-6 py-4">
                { item.gamesPlayed }
            </td>
            </tr>        
        </div>
        )
    })

    return (
        <div>
           { itemList }
        </div>
    );
}

