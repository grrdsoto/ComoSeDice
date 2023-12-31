import ProfilePictureGrid from "./profilePictureGrid.jsx";

/**
 * Function that will display an alert to inform the user that the email they entered
 * is already being used.
 */
function emailAlert() {
    let emailAlert = document.getElementById("emailAlert");
    emailAlert.style.display = "";
}

/**
 * Function that will determine whether or not the username the user has inputed is already
 * being used.
 * 
 * @param { Array } usernames - All usernames from the database. 
 */
function userNameMessage(usernames) {
    let userInput = document.getElementById("username").value;
    if (usernames.includes(userInput)) {
        document.getElementById("outlined_error_help").style.display = "";
    } else {
        document.getElementById("outlined_error_help").style.display = "none"
    }
}

/**
 * Function that will call the 'register' endpoint to create and verify a new user.
 */
function verifyNewAccount(e) {
    const form = document.querySelector("form");

    e.preventDefault();

    // Getting data from the form.
    let formData = new FormData(form);
    let email = formData.get("email")?.toString();
    let password = formData.get("password")?.toString();
    let name = formData.get("name")?.toString();
    let username = formData.get("username")?.toString();

    let url = document.getElementById("profilePicture")?.getAttribute("src")?.toString();

    /**
     * Calls the 'register' endpoint with the body of the user so it can be inserted into the database.
     */
    fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify( {
            email: email,
            name: name,
            normalGameMode: {
                bestScore: 0,
                gamesPlayed: 0
            },
            password: password,
            timedGameMode: {
                bestScore: 0,
                gamesPlayed: 0
            },
            username: username,
            profilePicture: url
        })
    }).then((response) => {

        // Redirect if successful
        if (response.redirected) {
            window.location.assign(response.url);
        } else {
            emailAlert();
        }
    });
}

/**
 * Function that handles the creation of the sign up form that the user will use to cteate a new account.
 * 
 * @param { urls } - array which contains all the 'src' values of the possible profile pictures.
 * @param { usernames } - array which contains all the username values.
 */
export default function Counter(props) {

    let urlMap = props.urls;
    let usernames = props.usernames;

    return (
        <div>
            <form className="space-y-4 md:space-y-6" onSubmit={verifyNewAccount}>

                <div className="flex items-center justify-center mt-5">
                    <img id="profilePicture" src="/src/pages/images/add-photo.png" className="w-24 h-24 mb-3 shadow-lg hover:opacity-40"></img>
                </div>  

                <ProfilePictureGrid client:idle urls= { urlMap }></ProfilePictureGrid>

                <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input type="name" name="name" id="name" placeholder="Enter your name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required></input>
                </div>
                <div>
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                    <input type="username" name="username" id="username" onKeyUp={(e) => userNameMessage(usernames, e)} placeholder="Enter your username" className="bg-red-50 border border-red-300 text-red-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500" required></input>
                    <p id="outlined_error_help" style={{display: 'none'}} className="mt-2 text-xs text-red-600 dark:text-red-400"><span className="font-medium">Username not available.</span></p>    
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="email" name="email" id="email" placeholder="Enter your remail" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required></input>
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" name="password" id="password" placeholder="Enter your password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required></input>
                </div>

                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                    Create account
                </button>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account? <a href="/signin" className="font-medium text-blue-600 text-primary-600 hover:underline dark:text-primary-500">Sign in</a>
                </p>
            </form>
        </div>
    );
}