import { IModalConfig } from "features/common/interfaces/ModalConfig.interface";
import { FilterType } from "../features/common/interfaces/FilterInterface.d";
import { PagnationInterface } from "../features/common/interfaces/PagnationInterface.d";
import { SorterInterface } from "../features/common/interfaces/SorterInterface.d";
import { viewTypeTypes } from "../features/common/types/viewTypeTypes.d";

/** */
export interface IInitialStateCrud {
  /** */
  view: viewTypeTypes;
  /** */
  deletedRows: boolean;
  /** */
  checkAllRows: boolean;
  /** */
  selectionMode: boolean;
  /** */
  selectedRows: any[];
  /** */
  pagnation: PagnationInterface;
  /** */
  filters: FilterType | null;
  /** */
  sorter: SorterInterface;
  /** */
  modalConfig: IModalConfig;
  /** */
  search: string;
}
