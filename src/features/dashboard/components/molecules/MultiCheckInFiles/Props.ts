import { EntityIdType } from "types";

export interface Props {
  files_ids: EntityIdType[];
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
}
