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
    campusID: string;
    pickupLocation = new PickupLocation();
	 
  }
  	export class CarpoolCookie {
  		carpool = new Carpool();

	  	constructor (name, description, carpoolID, campusName, campusID, address, lat, longitude) {
	  		this.carpool.name = name;
	  		this.carpool.description = description;
	  		this.carpool.carpoolID = carpoolID;
	  		this.carpool.campusName = campusName;
	  		this.carpool.campusID = campusID;
	  		this.carpool.pickupLocation.address = address;
	  		this.carpool.pickupLocation.geoCode.lat = lat;
	  		this.carpool.pickupLocation.geoCode.long = longitude;
	  	}
  	}
}