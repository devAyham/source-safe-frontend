import { EntityIdType } from "types/EntityId.type";

export interface IFormProps {
  formName?: string;
  entityId?: EntityIdType;
  onSuccess?: () => any;
  onError?: () => any;
}
