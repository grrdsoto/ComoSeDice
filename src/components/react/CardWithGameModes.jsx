/**
 * Modal component with the selection of game modes.
 */

import React from "react";
import "../../styles.css"


/**
 * Function that handles the creation of the modal and link card.
 * 
 * @param { title } - title of the link card that will be used.
 * @param { body } - body of link card.
 * @returns 
 */
export default function Counter(props) {

    let title = props.title;
    let body = props.body;

    return (
        <div>
            <li className="link-card h-48">
                <a href="#" className="h-screen flex items-center justify-center" data-modal-target="select-modal" data-modal-toggle="select-modal">
                    <h2>
                        {title}
                        <span>&rarr;</span>
                    
                        <p>
                            {body}
                        </p>
                    </h2>
                </a>
            </li>

            {/* Main modal */}
            <div id="select-modal" tabIndex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-md max-h-full">

                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Select game mode!
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="select-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        {/* Modal body */}
                        <div className="p-4 md:p-5">                            
                            <ul className="space-y-4 mb-4">
                                <li>
                                    <a href="/singleplayer" className="inline-flex items-center justify-center w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">                           
                                        <div className="block">
                                            <p className="w-full text-lg font-semibold">Normal mode</p>
                                            <p className="w-full text-xs text-gray-500 dark:text-gray-400">Get 10 word correct without running out of lives!</p>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="/timedMode" className="inline-flex items-center justify-center w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">
                                        <div className="block">
                                            <p className="w-full text-lg font-semibold">Timed mode</p>
                                            <p className="w-full text-xs text-gray-500 dark:text-gray-400">How many words can you get in 60 seconds?</p>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div> 

        </div>
    )
}


