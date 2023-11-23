import { AxiosResponse } from "axios";
import { EntityIdType } from "types/EntityId.type";

export interface IBaseEntityFormProps<T = any> {
  formName?: string;
  entityId?: EntityIdType;
  onSuccess?: (response: T) => any;
  onError?: (response: T) => any;
}
