import { EditOutlined } from "@ant-design/icons";
import { EditOutLineIconProps } from "./EditOutLineIconProps";

function EditOutLinedIcon(props: EditOutLineIconProps) {
  return (
    <EditOutlined
      {...props}
      style={{
        fontSize: `${props.size}px`,
        ...props.style,
      }}
    />
  );
}

export default EditOutLinedIcon;
