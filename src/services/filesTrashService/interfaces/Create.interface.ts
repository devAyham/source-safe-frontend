import { EntityIdType } from "types";

export default interface ICreate {
  name: string;
  folder_id: EntityIdType;
  file: any;
}
