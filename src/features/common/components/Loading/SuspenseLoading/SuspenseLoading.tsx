import { Loading3QuartersOutlined } from "@ant-design/icons";
import { Spin } from "components";
import React from "react";
/**
 *
 * @returns
 */
function SuspenseLoading() {
  return (
    <>
      <div style={{ height: "100vh", width: "100%" }}>
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin
            indicator={
              <Loading3QuartersOutlined spin style={{ fontSize: 60 }} />
            }
          />
        </div>
      </div>
    </>
  );
}

export default SuspenseLoading;
