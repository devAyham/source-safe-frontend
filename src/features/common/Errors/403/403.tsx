import { Result } from "antd";
import { Button } from "components";
import { useAppDispatch } from "features/common/hooks/useReduxHooks";
import { UiSliceActions } from "features/common/redux/slices/uiSlices";
import { useNavigate } from "react-router-dom";
import { MainFeaturesRoutes } from "router/constants/mainFeaturesRoutes";
import styles from "../styles.module.scss";
/**
 * @description a component that used to show an ui error intereface for 403 errors
 */
const FourOThreePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { SetError } = UiSliceActions;
  return (
    <div className={styles.container}>
      <Result
        status="403"
        title="403"
        subTitle="UnAuthorized Action"
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

export default FourOThreePage;
