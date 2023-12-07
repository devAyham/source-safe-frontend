import { Result } from "antd";
import { Button } from "components";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { MainFeaturesRoutes } from "router/constants/mainFeaturesRoutes";
import { useAppDispatch } from "features/common/hooks/useReduxHooks";
import { UiSliceActions } from "features/common/redux/slices/uiSlices";
/**
 * @description a component that used to show an ui error intereface for 404 errors
 */
const FourOFourPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { SetError } = UiSliceActions;

  return (
    <div className={styles.container}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
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

export default FourOFourPage;
