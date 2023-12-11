import { EntityIdInterface } from "../../../interfaces/EntityId.interface";

export default interface IEntity extends EntityIdInterface {
  name: string;
  email: string;
}
