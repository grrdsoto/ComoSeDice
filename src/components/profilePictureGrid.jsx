/**
 * Modal component with the gallery of the profile pictures that the user can get. 
 */

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
            <div className="flex items-center justify-center">
            <button className="btn w-28 hover:bg-gray-700 text-white text-sm rounded text-center mt-2" type="button" onClick={()=>document.getElementById('my_modal_5').showModal()}>open modal</button>
            </div>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {itemList}
                </div>

                <div className="modal-action">

                <button className="btn" type="button" onClick={() => document.getElementById('my_modal_5').close()}>Close</button>
                </div>
            </div>
            </dialog>
        </div>
    );
}

