module carpoolService {

  angular.module('service').service('carpoolService', []);
  export class carpoolId {
    id: String;

    constructor(carpoolId: String){
      this.id = carpoolId;
    }
    getCarpoolId = function(){
      return this.id;
    }

  }

}
