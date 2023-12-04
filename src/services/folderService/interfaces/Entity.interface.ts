import { EntityIdInterface } from "../../../interfaces/EntityId.interface";

export default interface IEntity extends EntityIdInterface {
  logo: File;
  name: string;
}