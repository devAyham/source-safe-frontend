import { Modal, Table } from "components";
import { Props } from "./Props";
import GetFileRequestTableColumns from "./columns";
const Component = ({ fileRequests, modalProps }: Props) => {
  return (
    <>
      <Modal
        {...modalProps}
        title="File Requests For This Folder"
        destroyOnClose
        closable={true}
        footer={<></>}
        style={{
          top: 40,
        }}
        width={1000}
      >
        <Table
          columns={GetFileRequestTableColumns()}
          dataSource={fileRequests}
        />
      </Modal>
    </>
  );
};
export default Component;
