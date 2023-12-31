/**
 * Modal component with the gallery of the profile pictures that the user can get. 
 */

import React from "react";
import "../../styles.css"

/**
 * Function that gets the img tag with the 'profilePicture' id and updates the attribute 'src' to the new
 * 'src' value. The new 'src' value will be the url of the picture clicked. It will also close the 
 * modal with the profile picture options.
 * 
 * @param { string } - pictureUrl string of the profile picture of the user.
 */
function changeImageAndCloseModal(pictureUrl) {
    let userPhoto = document.getElementById('profilePicture');
    userPhoto.src = pictureUrl;

    document.getElementById('profilePictureGridModal').close();
}

/**
 * Function that handles the creation of the modal and the profile picture grid.
 * 
 * @param { urls } - array which contains all the 'src' values of the possible profile pictures.
 */
export default function Counter(props) {

    let urlMap = props.urls;

    let itemList=[];

    urlMap.forEach((item, index)=>{
        itemList.push( 
        <div key={index} className="flex items-center justify-center">
            <a id="link" onClick={() => changeImageAndCloseModal(item)} href="#">  <img className="h-20 rounded-lg max-w-xs border" src={item} alt=""></img></a>
        </div>)
    })

    return (
        <div>
            <div className="flex items-center justify-center">
            <button className="btn w-28 bg-gray-700 hover:bg-gray-500 text-white text-sm rounded text-center mt-2" type="button" onClick={()=>document.getElementById('profilePictureGridModal').showModal()}>Profile picture</button>
            </div>
            <dialog id="profilePictureGridModal" className="rounded-lg max-w-lg border modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 m-4">
                        {itemList}
                    </div>
                </div>
            </dialog>
        </div>
    );
}

