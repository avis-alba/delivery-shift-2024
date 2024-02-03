export interface DeliveryPoint {
	id: string;
	name: string;
	latitude: number;
	longitude: number;
}

export interface DeliveryPointResponse {
	success: boolean;
	points: Array<DeliveryPoint>;
}

export interface PackageType {
	id: string;
	name: string,
	length: number;
	width: number;
	weight: number;
	height: number;
}

export interface PackageTypeResponse {
	success: boolean;
	packages: Array<PackageType>;
}

export interface DeliveryOption {
	id: string;
	price: number;
	days: number;
	name: string;
	type: string;
}

export interface DeliveryCalculationRequest {
	package: {
		length: number;
		width: number;
		weight: number;
		height: number;
	},
	senderPoint: {
		latitude: number;
		longitude: number;
	},
	receiverPoint: {
		latitude: number;
		longitude: number;
	}
}

export interface DeliveryCalculationResponse {
	success: boolean;
	options: Array<DeliveryOption>;
}
