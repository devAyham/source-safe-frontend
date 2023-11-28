import { Layout as AntLayout, FloatButton } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { Props } from "./Props";

/**
 * the main controlled component for the entire app layout t
 */
const Layout = (props: Props) => {
  const [width, setWidth] = useState<string>("80px");
  const layoutRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (layoutRef.current) {
      layoutRef.current.style.marginInlineStart = width;
    }
  }, [width]);
  return (
    <AntLayout hasSider>
      <AntLayout ref={layoutRef} style={{ transition: "all 0.7s ease-in-out" }}>
        <Content style={{ padding: "5px 43px  18px 48px", minHeight: "90vh" }}>
          <Outlet />
        </Content>
        <FloatButton.BackTop style={{ insetInlineStart: "1.5rem" }} />
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
