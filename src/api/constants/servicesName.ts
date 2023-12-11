// Define an enum with the possible service types
export enum ServiceType {
  Auth = "auth",
  Folder = "folder",
  File = "file",
  User = "users",
  FolderRequests = "my-folder-requests",
}
// Define an array of service names as a readonly tuple
const ServicesName = [
  "AuthService",
  "FolderService",
  "FileService",
  "UserService",
  "FolderRequests",
] as const;
// Define a type alias for the union of all service names

type ServicesName = (typeof ServicesName)[number]; // type ServicesName = "CitiesService"|"RegionsService"

// Define an object that maps each service name to its corresponding type
export const ServicesTypes: Record<ServicesName, ServiceType> = {
  AuthService: ServiceType.Auth,
  FolderService: ServiceType.Folder,
  FileService: ServiceType.File,
  UserService: ServiceType.User,
  FolderRequests: ServiceType.FolderRequests,
} as const;
