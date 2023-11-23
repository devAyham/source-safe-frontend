import { EntityIdType } from "types/EntityId.type";

/** */
export interface LocationDataNodeInterface {
  /** */
  key: string;
  /** */
  title: string | React.ReactNode;
  /** */
  locationtype?: any;
  /** */
  isLeaf?: boolean;
  /** */
  children?: LocationDataNodeInterface[];
  /** */
  selectable?: boolean;
  /** */
  checkable?: boolean;
  /** */
  id?: EntityIdType;
}
