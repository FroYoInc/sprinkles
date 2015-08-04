// This is a carpoolModel used to create a cookie and a carpool 
// which is used in other carpool controllers
module CarpoolModel {

	class GeoCode {
        lat: number;
        long: number;
      }
	class PickupLocation {
      address: string;
      geoCode = new GeoCode();
  	}
  export class Carpool {
    name: string;
    description: string;
    carpoolID: string;
    campusName: string;
    campus: string;
    pickupLocation = new PickupLocation();
	 
  }
  	export class CarpoolCookie {
  		carpool = new Carpool();

	  	constructor (name, description, carpoolID, campusName, campus, address, lat, longitude) {
	  		this.carpool.name = name;
	  		this.carpool.description = description;
	  		this.carpool.carpoolID = carpoolID;
	  		this.carpool.campusName = campusName;
	  		this.carpool.campus = campus;
	  		this.carpool.pickupLocation.address = address;
	  		this.carpool.pickupLocation.geoCode.lat = lat;
	  		this.carpool.pickupLocation.geoCode.long = longitude;
	  	}
  	}
}