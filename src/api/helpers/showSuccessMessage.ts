import { notification } from "antd";

export const showSuccessMessage = (message: string) => {
  notification.success({
    message,
    duration: 3,
  });
};
