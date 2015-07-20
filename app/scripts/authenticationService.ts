// to inject for angulars $q - "A service that helps you run functions asynchronously, and use 
 // their return values (or exceptions) when they are done processing."

module AuthenticationService {
	
	export class Access {
		private q: ng.IQService;
		public UserProfile: any;
	  constructor($q: ng.IQService, UserProfile: any) {
		        this.q = $q;
		        this.UserProfile = UserProfile;
		}
		static Factory($q:ng.IQService, UserProfile: any) {
			
			var Access = {

		    OK: 200,
		    UNAUTHORIZED: 401,
		    FORBIDDEN: 403,

		    isAnonymous: function() {
		      var deferred = $q.defer();
		      UserProfile.then(function(userProfile) {
		        if (userProfile.isAnonymous()) {
		          deferred.resolve(Access.OK);
		        } else {
		          deferred.reject(Access.FORBIDDEN);
		        }
		      });
		      return deferred.promise;
		    },

		    isAuthenticated: function() {
		      var deferred = $q.defer();
		      UserProfile.then(function(userProfile) {
		        if (userProfile.isAuthenticated()) {
		          deferred.resolve(Access.OK);
		        } else {
		          deferred.reject(Access.UNAUTHORIZED);
		        }
		      });
		      return deferred.promise;
		    }

		  };
		  return Access;
		}
	}

	export class UserProfile {
		private q: ng.IQService;
		public User: User;
		constructor($q: ng.IQService, User: User) {
		        this.q = $q;
		        this.User = User;
		}
		static Factory($q:ng.IQService, User: User) {
			var deferred = $q.defer();

			  User.profile(function(userProfile) {
			    deferred.resolve({

			      isAnonymous: function() {
			        return userProfile.anonymous;
			      },

			      isAuthenticated: function() {
			        return !userProfile.anonymous;
			      }

			    });
			  });

			  return deferred.promise;
		}
	}

	export class User {
		private resource: ng.resource.IResource;
		public user: any;
		constructor($resource: ng.resource.IResource){
			this.resource = $resource;
		}
		static Factory($resource: ng.resource.IResource) {
			this.user = $resource("rest/users/:id/:attr", { id: "@id" }, {

    			profile: {
      			method: "GET",
      			params: { attr: "profile" }
    			}
  			});
			return this.user;
		}
	}

}
