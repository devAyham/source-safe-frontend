import { Button, PlusCircleFilledIcon } from "components/atoms";
import { AddNewItemButtonProps } from "./AddNewItemButtonProps";

function AddNewItemButton(props: AddNewItemButtonProps) {
  return (
    <Button style={{ width: "100%" }} type="primary" shape="round" {...props} />
  );
}
export default AddNewItemButton;
