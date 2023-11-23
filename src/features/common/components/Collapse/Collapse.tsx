import React, { useState } from "react";
import styles from "./style.module.scss";
/** */
interface CollapseProps {
  /** */
  defaultKey?: string | number;
  /** */
  children: any;
}
/**
 *
 * @param {CollapseProps} param0
 * @returns
 */
const Collapse = ({ defaultKey, children }: CollapseProps) => {
  //   const [openKey, setOpenKey] = useState(defaultKey);

  return (
    <div className={styles.collapse}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            // defaultOpen: openKey === (child.props as any).name,
            // onClick: (e: any) => {
            //   setOpenKey(e);
            // },
          } as any);
        }
      })}
    </div>
  );
};
export default Collapse;
