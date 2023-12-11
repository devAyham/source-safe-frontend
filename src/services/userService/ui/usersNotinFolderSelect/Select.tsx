import { EntitySelect } from "components/molecules/selectWithApi";
import { ServiceName } from "../../constant/ServiceName";
import IEntity from "../../interfaces/Entity.interface";
import SelectProps from "./Select.props";
import { CustomEndPoints } from "api/constants/customEndPoints";

function Select({ params, folder_id, ...restProps }: SelectProps) {
  return (
    <EntitySelect<IEntity>
      entityType={`${ServiceName}/${CustomEndPoints.NotInFolder}/${folder_id}`}
      labelKey={"name"}
      valueKey={"id"}
      // params={{
      //   items_per_page: 200,
      //   ...params,
      // }}
      {...restProps}
    />
  );
}

export default Select;
