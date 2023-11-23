// Define an enum with the possible service types
export enum ServiceType {
  Auth = "auth",
}
// Define an array of service names as a readonly tuple
const ServicesName = ["AuthService"] as const;
// Define a type alias for the union of all service names

type ServicesName = (typeof ServicesName)[number]; // type ServicesName = "CitiesService"|"RegionsService"

// Define an object that maps each service name to its corresponding type
export const ServicesTypes: Record<ServicesName, ServiceType> = {
  AuthService: ServiceType.Auth,
} as const;
