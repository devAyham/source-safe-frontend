import { NoticeType } from "antd/es/message/interface";

/** */
export interface ErrorHandlerInterface {
  /**
   * @description Error message
   */
  message: string;
  /**
   * @description message type
   */
  type?: NoticeType;
  /**
   * @description HTTP Error status code
   */
  code?: number | string;
  /**
   * @description
   * - Wither navigate to the error page or not
   * - if true it will remove the message
   * @default true
   */
  navigate?: boolean;
}
