import { Col, Row } from "antd";
import { memo, ReactNode } from "react";
import styles from "./styles.module.scss";
import CardsSelect from "../CardsSelect/CardsSelect";
import { ISelectionConfigProps } from "components/organisms/CrudLayout/interfaces/CrudLayoutProps";
import { LoadingIndicator, Spin } from "components";
import { Gutter } from "antd/es/grid/row";

/** */
interface CardsLayoutProps {
  /** */
  children: ReactNode;
  /** */
  isfreeSampleLayout?: boolean;
  /** */
  isLoading?: boolean;
  /** */
  selection?: ISelectionConfigProps;
  /** */
  cardLayoutGutter?: Gutter | [Gutter, Gutter];
  /** */
  cardLayoutMargin?: string;
}
/**
 *
 * @param {CardsLayoutProps} param0
 * @returns
 */
const CardsLayout = ({
  children,
  isfreeSampleLayout,
  isLoading,
  selection,
  cardLayoutGutter = [45, 42],
  cardLayoutMargin = "36px",
}: CardsLayoutProps) => {
  return (
    <>
      <div className={styles.layout}>
        <Spin indicator={<LoadingIndicator />} spinning={isLoading}>
          <Row>
            <Col>
              {selection && (
                <CardsSelect
                  checkAllRows={selection.checkAllRows}
                  setcheckAllRows={selection.setcheckAllRows}
                  selectionMode={selection.selectionMode ?? false}
                  setselectionMode={selection.setselectionMode}
                />
              )}
            </Col>
          </Row>
          <div
            className={styles.cardLayout}
            style={{
              margin: cardLayoutMargin,
            }}
          >
            <div
              className={`${
                isfreeSampleLayout
                  ? styles.freeSampleLayout
                  : styles.cardLayoutContent
              }`}
            >
              <Row gutter={cardLayoutGutter}>{children}</Row>
            </div>
          </div>
        </Spin>
      </div>
    </>
  );
};

export default memo(CardsLayout);
