import { Result } from "antd";
import { Button } from "components";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { MainFeaturesRoutes } from "router/constants/mainFeaturesRoutes";
/**
 * @description a component that used to show an ui error intereface for 404 errors
 */
const FourOFourPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button
            onClick={() => {
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
