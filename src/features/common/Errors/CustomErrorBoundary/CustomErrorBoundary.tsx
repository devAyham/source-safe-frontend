import React from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import styles from "./styles.module.scss";
import FiveOO from "../500/500";

interface CustomErrorBoundaryProps {
  children: React.ReactNode;
}
/**
 * @description a custom react ErrorBoundary with a FallBackComponents
 * @param {ReactNode} children - the entire app usually
 */
function CustomErrorBoundary({ children }: CustomErrorBoundaryProps) {
  const FallBackComponents = ({ error, resetErrorBoundary }: FallbackProps) => {
    return (
      <div className={styles.container}>
        <FiveOO />
        <div style={{ width: "fit-content", margin: "10px", padding: "20px" }}>
          {error.message}
        </div>
      </div>
    );
  };
  return (
    <ErrorBoundary FallbackComponent={FallBackComponents}>
      {children}
    </ErrorBoundary>
  );
}

export default CustomErrorBoundary;
