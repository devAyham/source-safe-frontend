import { Layout as AntLayout } from "antd";
import { Content } from "antd/es/layout/layout";
import { ContentInfo } from "components/particels/ContentInfo";
import { SiderBar } from "components/particels/SiderBar";
import { useEffect, useRef, useState } from "react";
import { Props } from "./Props";
import styles from "./styles.module.scss";
import { Outlet } from "react-router-dom";
/**
 * the main controlled component for the entire app layout t
 */
const Layout = (props: Props) => {
  const [width, setWidth] = useState<string>("0px");
  const layoutRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (layoutRef.current) {
      layoutRef.current.style.marginInlineStart = width;
    }
  }, [width]);

  return (
    <AntLayout hasSider>
      <SiderBar />
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
