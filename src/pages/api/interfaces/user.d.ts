/**
 * User model for the user collection in the firebase database.
 */
export interface userModel {
    email: string;
    name: string;
    normalGameMode: {
        bestScore: string;
        gamesPlayed: string;
    };
    password: string;
    signedIn: string;
    timedGameMode: {
        bestScore: string;
        gamesPlayed: string;
    };
    username: string;
}