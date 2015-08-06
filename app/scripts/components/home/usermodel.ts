//This file is used to keep track of a user

module UserModel {
    export class User {
        email: string;
        password: string; 
        userID: string;
        isAuth: boolean;
    }
    export class UserCookie {
        email: string;
        firstName: string
        lastName: string;
        userID: string;
        userName: string;
        isAuth: boolean;
        isAdmin: boolean;


        constructor(email, firstName, lastName, userID, userName){
        	this.email = email;
        	this.firstName = firstName;
        	this.lastName = lastName;
        	this.userID = userID;
        	this.userName = userName;
        	this.isAuth = true;
            this.isAdmin = true;
        }

    }
}
