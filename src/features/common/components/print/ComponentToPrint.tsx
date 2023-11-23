import React, { forwardRef, LegacyRef } from "react";
import ImagesUploder from "../Upload/UploadWithSession/ImagesUploader/ImagesUplader";

interface Props {
  children?: React.ReactNode;
}
/**
 * @description a component that is used to print a seleceted component with a help of a ReactToPrint package
 */
export const ComponentToPrint = forwardRef<unknown, Props>((props, ref) => {
  return <div ref={ref as LegacyRef<HTMLDivElement>}>{props.children}</div>;
});
