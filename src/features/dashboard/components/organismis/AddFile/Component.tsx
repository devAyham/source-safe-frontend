import { Modal } from "components";
import { useIsMutating } from "react-query";
import { FileForm, FileServiceName } from "services/filesService";
import { Props } from "./Props";
const Component = ({
  formProps: { formName = FileServiceName, ...restFormProps },
  modalProps,
}: Props) => {
  const isLoading = useIsMutating();
  return (
    <>
      <Modal
        {...modalProps}
        title="Add New File"
        destroyOnClose
        okButtonProps={{
          htmlType: "submit",
          form: formName,
          loading: isLoading > 0,
        }}
        style={{
          top: 40,
        }}
      >
        <FileForm {...restFormProps} formName={formName} />
      </Modal>
    </>
  );
};
export default Component;
