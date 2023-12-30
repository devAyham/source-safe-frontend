import { Result } from "antd";
import { Button } from "components";
import { useAppDispatch } from "features/common/hooks/useReduxHooks";
import { UiSliceActions } from "features/common/redux/slices/uiSlices";
import { useNavigate } from "react-router";
import { MainFeaturesRoutes } from "router/constants/mainFeaturesRoutes";
import styles from "./styles.module.scss";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

/**
 * @description a component that used to show an ui error intereface for 500 errors or any runtime error
 */
const FiveOO = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { SetError } = UiSliceActions;
  // useEffect(() => {
  // dispatch(SetError(null));
  // }, [pathname]);

  return (
    <div className={styles.container}>
      <Result
        status="500"
        title="500"
        subTitle="Sorry, somthing went wrong try again later"
        extra={
          <Button
            onClick={() => {
              dispatch(SetError(null));
              navigate(MainFeaturesRoutes.DashboardRoute);
            }}
            type="primary"
          >
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default FiveOO;
