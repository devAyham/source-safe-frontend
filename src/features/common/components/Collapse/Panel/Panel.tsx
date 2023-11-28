import { Tooltip } from "antd";
import styles from "../style.module.scss";
import { ReactComponent as PhoneIcon } from "assets/svgs/phone_icon.svg";
import React, { useEffect, useRef, useState } from "react";
import {
  FacebookOutlined,
  MobileOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { Button } from "components";
/** */
interface CollapsePanelProps {
  /** */
  name?: any;
  /** */
  defaultOpen?: boolean;
  /** */
  onClick?: (e: any) => void;
  /** */
  label?: any;
  /** */
  value?: any;
  /** */
  type?: any;
}

/**
 *
 * @param {CollapsePanelProps} param0
 * @returns
 */
const CollapsePanel = ({
  name,
  defaultOpen = false,
  onClick,
  label,
  value,
  type,
}: CollapsePanelProps) => {
  const content = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(defaultOpen);
  // default style of the panel
  const defaultStyle = {
    maxWidth: "",
    paddingInline: "",
    width: "2.2rem",
  };
  // active style as open panel
  const activeStyle = {
    maxWidth: "100%",
    paddingInline: "1rem",
    width: "12rem",
  };
  useEffect(() => {
    if (content.current && panel.current) {
      if (!open) {
        content.current.style.width = defaultStyle.maxWidth;
        content.current.style.paddingInline = defaultStyle.paddingInline;
        panel.current.style.width = defaultStyle.width;
      } else {
        content.current.style.width = activeStyle.maxWidth;
        content.current.style.paddingInline = activeStyle.paddingInline;
        panel.current.style.width = activeStyle.width;
      }
    }
  }, [open]);

  const contactIcon = (type: any) => {
    switch (type) {
      case "whatsapp":
        return <WhatsAppOutlined className={styles.customSVG} />;
      case "facebook":
        return <FacebookOutlined className={styles.customSVG} />;
      case "phone_number":
        return <MobileOutlined className={styles.customSVG} />;
      default:
        return <PhoneIcon />;
    }
  };

  return (
    <div key={name} ref={panel} className={styles.collapsePanel}>
      <Button
        className={styles.collapseBtn}
        type="text"
        icon={contactIcon(type)}
        onClick={(e) => {
          setOpen(!open);
          onClick?.(name);
        }}
      />
      <div ref={content} className={styles.content}>
        <div className={styles.name}>{label}</div>
        <Tooltip title={value}>
          <div className={styles.value}>{value}</div>
        </Tooltip>
      </div>
    </div>
  );
};

export default CollapsePanel;
