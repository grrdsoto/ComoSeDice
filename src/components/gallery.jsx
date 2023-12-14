import React from "react";
import "../styles.css"

export default function Counter(props) {

    console.log("I'm in the gallery.jsx");

    let urlMap = props.urls;

    let itemList=[];

    urlMap.forEach((item, index)=>{
        itemList.push( <div key={index} className="flex items-center justify-center">
        <img className="h-12 rounded-lg max-w-xs" src={item} alt=""></img>
    </div>)
    })
        

    return (
        <div>
            <button data-modal-target="default-modal" data-modal-toggle="default-modal" className="block w-28 hover:bg-gray-700 text-white text-sm rounded text-center" type="button">Profile picture</button>
            
            <div id="default-modal" aria-hidden="false" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-2xl max-h-full">

                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Choose your profile picture
                            </h3>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {itemList}
                        </div>

                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button data-modal-hide="default-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                            <button data-modal-hide="default-modal" type="button" className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        
    );
}