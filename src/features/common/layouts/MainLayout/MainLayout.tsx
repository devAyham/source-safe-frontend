import { FloatButton, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import SideBar from "../Sidebar/Sidebar";

type MainLLayoutProps = {
  children?: React.ReactNode;
};
/**
 * the main controlled component for the entire app layout t
 */
const MainLayout = ({ children }: MainLLayoutProps) => {
  const [width, setWidth] = useState<string>("80px");
  const layoutRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (layoutRef.current) {
      layoutRef.current.style.marginInlineStart = width;
    }
  }, [width]);
  return (
    <Layout hasSider>
      <SideBar onWidthChange={(e) => setWidth(e)} />
      <Layout ref={layoutRef} style={{ transition: "all 0.7s ease-in-out" }}>
        <Header />
        <Content style={{ padding: "5px 43px  18px 48px", minHeight: "90vh" }}>
          <Outlet />
        </Content>
        <FloatButton.BackTop style={{ insetInlineStart: "1.5rem" }} />
      </Layout>
    </Layout>
  );
};

export default MainLayout;
