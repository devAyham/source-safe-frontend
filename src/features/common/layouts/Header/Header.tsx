import {
  Avatar,
  Dropdown,
  Menu,
  MenuProps,
  Space,
  Popover,
  Collapse,
} from "antd";
import { Header } from "antd/es/layout/layout";
import styles from "./styles.module.scss";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { ReactComponent as Notification } from "assets/svg/generalSvgs/notification.svg";
import { LanguagePicker } from "features/common/components/Pickers/Language/LanguagePickerRadio";
import Logout from "features/auth/components/Modals/Logout";
import { useAppSelector } from "features/common/hooks/useReduxHooks";
import { FullScreenButton } from "features/common/components/Buttons/FullScreen/FullScreen";
import InstallPWA from "features/common/components/InstallPWA/InstallPWA";
import { useNavigate } from "react-router-dom";
import RefreshPage from "features/common/components/Buttons/RefreshPage/RefreshPage";
import { useTranslation } from "react-i18next";
import { Button, Image } from "components";

const MenuLinks = () => {
  return (
    <>
      <div className={styles.linksBox}>
        <Menu
          className={styles.linksMenu}
          theme="light"
          mode="horizontal"
          items={[
            {
              key: "contcats",
              label: (
                <Button className={styles.link} type={"link"}>
                  Contacts
                </Button>
              ),
            },
            {
              key: "aboutus",
              label: (
                <Button className={styles.link} type={"link"}>
                  About Us
                </Button>
              ),
            },
            {
              key: "FAQs",
              label: (
                <Button className={styles.link} type={"link"}>
                  FAQs
                </Button>
              ),
            },
          ]}
        />
      </div>
    </>
  );
};
const NotificationPopover = () => {
  return (
    <>
      <Popover placement="bottom" title={"Notifications"} trigger="click">
        <Notification className={styles.notifyIcon} />
      </Popover>
    </>
  );
};
const AuthUserMenu = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const items: MenuProps["items"] = [
    {
      key: "langauge",
      type: "group",
      label: (
        <>
          <Collapse bordered={false} expandIconPosition="end" ghost>
            <Collapse.Panel
              header={t("CHANGE_LANGUAGE")}
              key="1"
              style={{ color: "white" }}
            >
              <LanguagePicker />
            </Collapse.Panel>
          </Collapse>
        </>
      ),
    },
    {
      key: "install",
      label: <InstallPWA />,
    },
    {
      key: "logout",
      label: <Logout />,
    },
  ];
  return (
    <>
      <Dropdown
        className={styles.profileMenu}
        menu={{ items }}
        trigger={["click"]}
      >
        <Space>
          <DownOutlined className={styles.menuIcon} />
        </Space>
      </Dropdown>
    </>
  );
};
const HeaderBar = () => {
  return (
    <>
      <Header className={styles.header}>
        <RefreshPage />
        <FullScreenButton />
        <div className={styles.notifyAndAvatarBox}>
          <NotificationPopover />
          <AuthUserMenu />
        </div>
      </Header>
    </>
  );
};
export default HeaderBar;
