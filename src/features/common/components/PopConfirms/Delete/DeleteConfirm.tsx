import { message, Popconfirm, PopconfirmProps } from "antd";
// import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { Button, DeleteOutLinedIcon } from "components";
import {EntityIdInterface} from "../../../../../interfaces/EntityId.interface";
/** */
interface DeletePopComfirmProps extends EntityIdInterface{
  /** */
  deletProduct: any;
  /** */

  /** */
  iconSize?: number;
}
/**
 *
 * @param {DeletePopComfirmProps} param0
 * @returns
 */
const DeletePopComfirm = ({
  deletProduct,
  id,
  iconSize,
}: DeletePopComfirmProps) => {
  const { t } = useTranslation();
  // const onDeleteItems = (id: number) => {
  //   deletProduct.mutateAsync(id);
  // };
  const cancel = () => {
    message.error("Delete process is cancelled");
  };

  return (
    <Popconfirm
      title={t("DELETE_ITEM")}
      description={t("ARE_YOU_SURE_YOU_WANT_TO_DELETE_IT")}
      onConfirm={() => deletProduct.mutate({ id })}
      okButtonProps={{
        loading: deletProduct.isLoading,
      }}
      // onCancel={cancel}
      okType={"danger"}
      okText={t("YES")}
      cancelText={t("NO")}
      // icon={<QuestionCircleOutlined style={{ color: "red" }} />}
    >
      <Button
        danger
        type="link"
        size="large"
        icon={<DeleteOutLinedIcon size={iconSize} />}
      />
    </Popconfirm>
  );
};

export default DeletePopComfirm;
