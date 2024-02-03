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