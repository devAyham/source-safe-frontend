import { Layout as AntLayout } from "antd";
import { Content } from "antd/es/layout/layout";
import { ContentInfo } from "components/particels/ContentInfo";
import { SideBar } from "components/particels/SideBar";
import { useEffect, useRef, useState } from "react";
import { Props } from "./Props";
import styles from "./styles.module.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
/**
 * the main controlled component for the entire app layout t
 */
const Layout = ({ indexPage }: Props) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [width, setWidth] = useState<string>("0px");
  const layoutRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (layoutRef.current) {
      layoutRef.current.style.marginInlineStart = width;
    }
  }, [width]);

  useEffect(() => {
    if (pathname === "/" && indexPage) {
      navigate(indexPage);
    }
  }, [pathname]);

  return (
    <AntLayout hasSider>
      <SideBar />
      <AntLayout>
        <Content className={styles.content}>
          <Outlet />
        </Content>
      </AntLayout>
      <ContentInfo />
    </AntLayout>
  );
};

export default Layout;
