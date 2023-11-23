import { DeleteOutlined } from "@ant-design/icons";
import { DeleteOutLinedIconProps } from "./DeleteOutLinedProps";

function DeleteOutLinedIcon(props: DeleteOutLinedIconProps) {
  return (
    <DeleteOutlined
      {...props}
      style={{
        fontSize: `${props.size}px`,
        ...props.style,
      }}
    />
  );
}

export default DeleteOutLinedIcon;
