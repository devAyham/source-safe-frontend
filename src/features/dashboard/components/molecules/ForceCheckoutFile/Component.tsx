import { UploadOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";
import { CustomEndPoints } from "api/constants/customEndPoints";
import { generateEntityCollectionQueryKey } from "api/helpers/queryKeysFactory";
import { Button, Modal } from "components";
import { useAppSelector } from "features/common/hooks/useReduxHooks";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { FileServiceName, useFileApi } from "services/filesService";
import { Props } from "./Props";

function Component({ file_id, disabled }: Props) {
  const {
    tokens: { accessToken },
  } = useAppSelector((state) => state.auth);
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const {
    createEntity: { mutate, isLoading },
  } = useFileApi<{}>(
    {
      createConfig: {
        onSuccess() {
          message.success(`file uploaded successfully`);
          queryClient.invalidateQueries(
            generateEntityCollectionQueryKey({
              entityType: FileServiceName,
              params: {},
            })
          );
          setOpen(false);
        },
      },
    },
    {
      createEndpoint: `${FileServiceName}/${file_id}/${CustomEndPoints.ForceCheckOut}`,
    }
  );

  const onOk = () => {
    mutate({});
  };
  const onCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        title={"Are You sure you want to force check out this file ?"}
        closable={false}
        onCancel={onCancel}
        onOk={onOk}
        cancelButtonProps={{ danger: true }}
        width={410}
        destroyOnClose
        confirmLoading={isLoading}
      />
      <Button
        block
        style={{ height: 40 }}
        type="text"
        onClick={() => setOpen(true)}
        disabled={disabled}
      >
        Force Check-out
      </Button>
    </>
  );
}

export default Component;
