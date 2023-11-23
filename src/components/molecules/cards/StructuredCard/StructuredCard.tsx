import { Checkbox, Col, Row } from "antd";
import { Card } from "components/atoms";
import React, { ReactNode, useMemo } from "react";
import { Item } from "types/Content.type";
import { StructuredCardProps } from "./StructuredCardProps";
import styles from "./styles.module.scss";

const {
  card,
  cardStyles,
  selected,
  contentStyles,
  logoBox,
  logo,
  titleStyles,
  subContent,
  subTitleStyles,
  disc,
  cardActions,
  actionStyles,
  hoverAble,
  noContentStyles,
  badgeStyles,
} = styles;

function StructuredCard({
  icon,
  title,
  actions,
  content,
  height = 115,
  selectConfig,
  onClick,
  hoverable,
  badge,
}: StructuredCardProps) {
  // const { checked, setChecked } = useCardSelection({
  //   id,
  //   selectionMode,
  //   ...restProps,
  // });
  const cardHoverable = hoverable ?? !!onClick ?? selectConfig?.selectionMode;
  const { cardSelected, onChange, selectionMode } = selectConfig ?? {};

  let Icon;
  let iconCols = selectionMode ? 5 : 6;
  if (!("Component" in icon)) {
    Icon = React.cloneElement(icon, { className: logo });
  } else {
    Icon = React.cloneElement(icon.Component, { className: logo });
    iconCols = selectionMode ? icon.cols - 1 : icon.cols;
  }

  //TODO - support menu items
  const getActions = useMemo(() => {
    return actions?.map((action: ReactNode, index) =>
      action ? (
        <span key={`action-${index}`} className={actionStyles}>
          {action}
        </span>
      ) : (
        <></>
      )
    );
  }, [actions]);

  const getContent = useMemo(() => {
    if (React.isValidElement(content)) {
      return content;
    } else {
      return (content as Item[])?.map((row, index) => {
        return (
          <div key={`content-${index}`} className={subContent}>
            <div key={`key-1-${index}`} className={subTitleStyles}>
              {row.key}
            </div>
            {row.value && (
              <div key={`disc-1-${index}`} className={disc}>
                : {row.value}
              </div>
            )}
          </div>
        );
      });
    }
  }, [content]);

  const onDeflautClick = (e: any) => {
    // if (selectionMode) {
    //   setChecked(!checked);
    // }
    onClick?.(e);
  };

  return (
    <>
      <div className={cardStyles}>
        <Card
          className={`${card} ${cardHoverable && hoverAble} ${
            cardSelected && selectionMode ? selected : ""
          }`}
          style={{ height }}
          onClick={onDeflautClick}
          hoverable={cardHoverable}
        >
          <Row className={contentStyles} gutter={[8, 0]}>
            {selectionMode && (
              <Col span={1}>
                <Checkbox checked={cardSelected} onChange={onChange} />
              </Col>
            )}
            <Col className={logoBox} span={iconCols}>
              {Icon}
            </Col>
            <Col
              xs={24 - (iconCols + 2)}
              md={24 - (iconCols + 2)}
              lg={24 - (iconCols + 2)}
              xl={24 - (iconCols + 2)}
              className={!content ? noContentStyles : ""}
            >
              <div className={titleStyles}>{title}</div>
              {getContent}
            </Col>
            {actions ? (
              <Col span={2}>
                <div className={cardActions}>{getActions}</div>
              </Col>
            ) : badge ? (
              <Col span={2} className={badgeStyles}>
                {badge}
              </Col>
            ) : null}
          </Row>
        </Card>
      </div>
    </>
  );
}

export default StructuredCard;
