import { EntitySelectProps } from "components/molecules/selectWithApi";
import IEntity from "../../interfaces/Entity.interface";

export default interface SelectProps
  extends Partial<Omit<EntitySelectProps<IEntity>, "entityType">> {}
