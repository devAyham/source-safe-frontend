import { Col, Row } from "antd";
import {
  useGetControlActions,
  useGetMainActions,
  useGetTags,
  useGetTitle,
} from "./hooks";
import { PageHeaderProps } from "./PageHeaderProps";
import styles from "./styles.module.scss";

const {
  Srow,
  SmainTitle,
  Stitle,
  Stag,
  Scol,
  SsearchCol,
  SextraActions,
  SFilter,
  Sclickable,
} = styles;

function PageHeader({
  title,
  controlActions,
  mainActions,
  tags,
}: PageHeaderProps) {
  const { getTitle } = useGetTitle({ title, className: SmainTitle });
  const { getTags } = useGetTags({ tags, className: Stag, Sclickable });
  const { getMainActions } = useGetMainActions({
    mainActions,
    className: SextraActions,
  });
  const { getControlActions } = useGetControlActions({
    controlActions,
    Scol,
    SextraActions,
    SFilter,
    SsearchCol,
  });

  return (
    <>
      <Row className={Srow} gutter={[8, 0]}>
        {title && (
          <Col span={24} className={SmainTitle}>
            {getTitle}
            {tags && getTags}
          </Col>
        )}
        {mainActions && getMainActions}
        {controlActions && getControlActions}
      </Row>
    </>
  );
}

export default PageHeader;
