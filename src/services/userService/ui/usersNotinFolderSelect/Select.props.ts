import { EntitySelectProps } from "components/molecules/selectWithApi";
import IEntity from "../../interfaces/Entity.interface";
import { EntityIdType } from "types";

export default interface SelectProps
  extends Partial<Omit<EntitySelectProps<IEntity>, "entityType">> {
  folder_id: EntityIdType;
}
