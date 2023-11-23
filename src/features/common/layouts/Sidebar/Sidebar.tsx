import { Layout, Menu } from "antd";
import { ReactComponent as Logo } from "assets/svg/generalSvgs/logo.svg";
import { rolesTypes } from "features/auth/types/roleTypes";
import { menuItemsWithRoles } from "features/common/data/MenuItems";
import { useAppSelector } from "features/common/hooks/useReduxHooks";
import { MenuItemType } from "features/common/types/MenuItemType.d";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useWindowSize } from "../../hooks/useWindowSize";
import "./sideBarStyles.scss";

const { Sider } = Layout;
interface SideBarProps {
  onWidthChange: (e: string) => void;
}
const SideBar = ({ onWidthChange }: SideBarProps) => {
  const [collapsed, setCollapsed] = useState(true);
  const [widths, setWidths] = useState({ width: "15%", collapsedWidth: "80" });
  const { user } = useAppSelector((state) => state.auth);
  const [roleBasedMenuItems, setRoleBasedMenuItems] =
    useState<MenuItemType[]>();
  const { width, height } = useWindowSize();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string>("");
  let resize = () => {
    if (width >= 1199) {
      setWidths({ width: "15%", collapsedWidth: "80" });
    } else if (width >= 768) {
      setWidths({ width: "25%", collapsedWidth: "80" });
    } else {
      setWidths({ width: "100%", collapsedWidth: "0" });
    }
  };
  useEffect(() => {
    const items: MenuItemType[] = [];
    menuItemsWithRoles.forEach((item) => {
      items.push(item.item);
    });
    setRoleBasedMenuItems(items);
  }, [user]);

  useEffect(() => {
    resize();
  }, [width, height]);

  useEffect(() => {
    const newArr: any[] = [];
    roleBasedMenuItems?.map((v: any) =>
      v?.children.map((c: any) => newArr.push(c.key))
    );
    const newStr: string = newArr.reduce(
      (acc, substring) =>
        window.location.hash.toLowerCase().includes(substring.toLowerCase()) &&
        substring.length > acc.length
          ? substring
          : acc,
      ""
    );
    setSelectedKeys(newStr);
  }, [location, roleBasedMenuItems]);

  useEffect(() => {
    const html = document.querySelector("html");
    if (!collapsed && widths.width === "100%") {
      if (html) html.style.overflow = "hidden";
    } else if (!collapsed) {
      if (html) html.style.overflow = "initial";
      onWidthChange?.(widths.width);
    } else {
      if (html) html.style.overflow = "initial";
      onWidthChange?.(widths.collapsedWidth + "px");
    }
  }, [collapsed, widths]);

  return (
    <Sider
      breakpoint="md"
      collapsedWidth={widths.collapsedWidth}
      width={widths.width}
      className={"sidebar"}
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div
        className={"logobox"}
        onClick={() => {
          setCollapsed(!collapsed);
        }}
      >
        {collapsed ? (
          <div className="logo">
            <Logo />
            {/* <ImportSvg.Component
              src="open_pill_icon.svg"
              className={"subLogo1"}
            />
            <SubLogo2 className={"subLogo2"} /> */}
          </div>
        ) : (
          <div className="logo">
            <Logo />
            {/* <ImportSvg.Component
              src="open_pill_icon.svg"
              className={"subLogo1"}
            />
            <SubLogo2 className={"subLogo2"} />
            <div className="textlogoOverlay" />
            <ImportSvg.Component
              src="text_logo_icon.svg"
              className={"textLogo"}
            /> */}
          </div>
        )}
      </div>
      <Menu
        className={"menu"}
        onClick={({ key }) => {
          if (width < 768) {
            setCollapsed(true);
          }
          navigate(key);
        }}
        defaultSelectedKeys={[selectedKeys]}
        selectedKeys={[selectedKeys]}
        mode="inline"
        theme="light"
        items={roleBasedMenuItems}
      ></Menu>
    </Sider>
  );
};

export default SideBar;
