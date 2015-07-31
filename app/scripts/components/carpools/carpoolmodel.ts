module CarpoolModel {
  export class Carpool {
    name: string;
    description: string;
    carpoolID: string;
    campusName: string;
    campusID: string;
	pickupLocation: {
      address: string;
      geoCode: {
        lat: number;
        long: number;
      }
  	} 
  }
  	export class CarpoolCookie {
  		carpool: Carpool;

	  	constructor (name, description, carpoolID, campusName, campusID, address, lat, longitude) {
	  		this.carpool.name = name;
	  		this.carpool.description = description;
	  		this.carpool.carpoolID = carpoolID;
	  		this.carpool.campus = campus;
	  		this.carpool.campusID = campusID;
	  		this.carpool.pickupLocation.address = address;
	  		this.carpool.pickupLocation.geoCode.lat = lat;
	  		this.carpool.pickupLocation.geoCode.long = longitude;
	  	}
	  	constructor (newCarpool: Carpool) {
	  		this.carpool.name = newCarpool.name;
	  		this.carpool.description = newCarpool.description;
	  		this.carpool.carpoolID = newCarpool.carpoolID;
	  		this.carpool.campus = newCarpool.campus;
	  		this.carpool.campusID = newCarpool.campusID;
	  		this.carpool.pickupLocation.address = newCarpool.pickupLocation.address;
	  		this.carpool.pickupLocation.geoCode.lat = newCarpool.pickupLocation.geoCode.lat;
	  		this.carpool.pickupLocation.geoCode.long = newCarpool.pickupLocation.geoCode.longitude;
	  	}
  	}
}