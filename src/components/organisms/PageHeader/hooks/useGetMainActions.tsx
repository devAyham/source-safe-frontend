import { Col } from "antd";
import { Button, ButtonProps } from "components/atoms";
import { isValidElement, useMemo } from "react";
import {
  ActionWithGridProps,
  ColConfig,
  MainActionConfigProps,
  MainActionProps,
} from "../PageHeaderProps";
import isValidReactNode from "../../../../helpers/isValidReactNode";

interface getMainActionsProps {
  mainActions?: MainActionProps;
  className?: string;
}
export const useGetMainActions = ({
  mainActions,
  className,
}: getMainActionsProps) => {
  const getMainActions = useMemo(() => {
    if (isValidElement(mainActions)) {
      return mainActions;
    } else {
      const Defualt_Col_Config = {
        xs: 12,
        md: 10,
        lg: 6,
        xl: 4,
      } as ColConfig;
      const Defualt_Space_Config = {
        marginTop: 6,
      } as React.CSSProperties;
      let PAction;
      let PColConfig = Defualt_Col_Config;
      let SAction;
      let SColConfig = Defualt_Col_Config;
      let EAction;
      let EColConfig = Defualt_Col_Config;

      const { primaryAction, customActions, secondaryAction } =
        (mainActions as MainActionConfigProps) ?? {};

      if (primaryAction) {
        if (isValidReactNode(primaryAction)) {
          PAction = primaryAction;
        } else {
          const { action, grid } = primaryAction as ActionWithGridProps;
          PColConfig = grid ?? PColConfig;
          if (isValidReactNode(action)) {
            PAction = action;
          } else {
            const buttonProps = action as ButtonProps;
            PAction = (
              <Button
                type="primary"
                // block
                shape={"round"}
                style={{ fontWeight: 500, padding: "0px 40px" }}
                {...buttonProps}
              />
            );
          }
        }
      }
      if (secondaryAction) {
        if (isValidReactNode(secondaryAction)) {
          SAction = secondaryAction;
        } else {
          const { action, grid } = secondaryAction as ActionWithGridProps;
          SColConfig = grid ?? SColConfig;
          if (isValidReactNode(action)) {
            SAction = action;
          } else {
            const buttonProps = action as ButtonProps;
            SAction = (
              <Button
                type="primary"
                // block={true}
                shape={"round"}
                style={{ fontWeight: 500, padding: "0px 40px" }}
                {...buttonProps}
              />
            );
          }
        }
      }
      if (customActions) {
        if (isValidReactNode(customActions)) {
          EAction = customActions;
        } else {
          const { action, grid } = customActions as ActionWithGridProps;
          EColConfig = grid ?? EColConfig;
          if (isValidReactNode(action)) {
            EAction = action;
          } else {
            const buttonProps = action as ButtonProps;
            EAction = <Button {...buttonProps} />;
          }
        }
      }
      return (
        <>
          {PAction && (
            <Col style={Defualt_Space_Config} {...PColConfig}>
              {PAction}
            </Col>
          )}
          {SAction && (
            <Col style={Defualt_Space_Config} {...SColConfig}>
              {SAction}
            </Col>
          )}
          {EAction && (
            <Col
              style={Defualt_Space_Config}
              {...EColConfig}
              className={className}
            >
              {EAction}
            </Col>
          )}
        </>
      );
    }
  }, [mainActions]);

  return { getMainActions };
};
