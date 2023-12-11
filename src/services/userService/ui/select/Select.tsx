import { EntitySelect } from "components/molecules/selectWithApi";
import { ServiceName } from "../../constant/ServiceName";
import IEntity from "../../interfaces/Entity.interface";
import SelectProps from "./Select.props";

function Select({ params, ...restProps }: SelectProps) {
  return (
    <EntitySelect<IEntity>
      entityType={ServiceName}
      labelKey={"name"}
      valueKey={"id"}
      params={{
        items_per_page: 200,
        ...params,
      }}
      {...restProps}
    />
  );
}

export default Select;
