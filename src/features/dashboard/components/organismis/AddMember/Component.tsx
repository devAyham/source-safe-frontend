import { CustomEndPoints } from "api/constants/customEndPoints";
import { ServiceType } from "api/constants/servicesName";
import { EntityForm, Modal } from "components";
import { useAppSelector } from "features/common/hooks/useReduxHooks";
import { useIsMutating } from "react-query";
import { UserSelect, UserServiceName } from "services/userService";
import { EntityIdType } from "types";
import { Props } from "./Props";
import { UsersNotInFolderSelect } from "services/userService/ui/usersNotinFolderSelect";

const Component = ({
  formProps: { formName = UserServiceName, onError, onSuccess },
  modalProps,
}: Props) => {
  const isLoading = useIsMutating();
  const {
    contentInfo: { activeFolderId },
  } = useAppSelector((state) => state.sharedData);

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
        <EntityForm<
          {
            users_ids: EntityIdType[];
          },
          {},
          {},
          {},
          {}
        >
          serviceName={ServiceType.Folder}
          formName={formName}
          entityId={`${activeFolderId}/${CustomEndPoints.AddUsers}`}
          formProps={{
            layout: "vertical",
          }}
          apiOptions={{
            patchConfig: {
              onSuccess: onSuccess,
              onError: onError,
            },
            getDetailsConfig: {
              enabled: false,
            },
          }}
          rowProps={{
            gutter: [16, 16],
          }}
          schema={[
            {
              grid: {
                sm: 24,
              },
              required: true,
              name: "users_ids",
              label: <div className="label">Members</div>,
              labelCol: { span: 24 },
              withControlRender(value) {
                return (
                  <UsersNotInFolderSelect
                    mode="multiple"
                    folder_id={activeFolderId ?? 0}
                  />
                );
              },
            },
          ]}
        />
      </Modal>
    </>
  );
};
export default Component;
