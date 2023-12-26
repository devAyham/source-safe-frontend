import { UploadOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";
import { CustomEndPoints } from "api/constants/customEndPoints";
import { generateEntityCollectionQueryKey } from "api/helpers/queryKeysFactory";
import { Button, Modal } from "components";
import { useAppSelector } from "features/common/hooks/useReduxHooks";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { FileServiceName } from "services/filesService";
import { Props } from "./Props";

function Component({ file_id, disabled }: Props) {
  const {
    tokens: { accessToken },
  } = useAppSelector((state) => state.auth);
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const onCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        title={"Upload your new file version to check out"}
        closable={false}
        onCancel={onCancel}
        cancelButtonProps={{ danger: true }}
        footer={<></>}
        width={410}
        destroyOnClose
      >
        <Upload.Dragger
          name="file"
          multiple={false}
          listType="picture"
          height={200}
          action={`${process.env.REACT_APP_BASE_API_URL}${FileServiceName}/${file_id}/${CustomEndPoints.CheckOut}`}
          headers={{
            Authorization: `Bearer ${accessToken}`,
          }}
          onChange={(info) => {
            if (info.file.status === "done") {
              message.success(`${info.file.name} file uploaded successfully`);
              queryClient.invalidateQueries(
                generateEntityCollectionQueryKey({
                  entityType: FileServiceName,
                  params: {},
                })
              );
              setOpen(false);
            } else if (info.file.status === "error") {
              message.error(
                `${info.file.name} file failed to upload try again later or try to refresh your page`
              );
            }
          }}
        >
          <Button type="primary" icon={<UploadOutlined />}>
            Click to Upload
          </Button>
        </Upload.Dragger>
      </Modal>
      <Button
        block
        style={{ height: 40 }}
        type="text"
        onClick={() => setOpen(true)}
        disabled={disabled}
      >
        Check-out
      </Button>
    </>
  );
}

export default Component;
