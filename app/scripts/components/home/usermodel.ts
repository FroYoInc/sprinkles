//This file is used to keep track of a user
/// <reference path='..\..\libs\angular\angular.d.ts' />

module UserModel {
    export class User {
        email: string;
        password: string; 
        userID: string;
        isAuth: boolean;
    }

    export class UserCookie {

    	user: User;
    	$cookies: ngCookies;
    	static $inject = ["$cookies"];
    	constructor (email, password, userID, $cookies: any){
        	this.user.email = email;
        	this.user.password = password;
        	this.user.userID = userID;
        	this.user.isAuth = false;
        }

        setUserCookie = function(newUser: User){
        	$cookies.putObject('userID', newUser.userID);
        	$cookies.putObject('isAuth', true);
        }
        displayUserCookie = function(){
        	$cookies.getAll();
        }
    }
}
