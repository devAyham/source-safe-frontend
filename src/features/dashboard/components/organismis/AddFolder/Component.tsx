import { Modal } from "components";
import { useIsMutating } from "react-query";
import { FolderForm, FolderServiceName } from "services/folderService";
import { Props } from "./Props";
const Component = ({
  formProps: { formName = FolderServiceName, ...restFormProps },
  modalProps,
}: Props) => {
  const isLoading = useIsMutating();
  return (
    <>
      <Modal
        {...modalProps}
        title="Add New Folder"
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
        <FolderForm {...restFormProps} formName={formName} />
      </Modal>
    </>
  );
};
export default Component;
