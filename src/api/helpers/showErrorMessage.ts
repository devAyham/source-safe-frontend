import { notification } from "antd";

export const showErrorMessage = (message: string) => {
  notification.error({
    message,
    duration: 4,
  });
};
