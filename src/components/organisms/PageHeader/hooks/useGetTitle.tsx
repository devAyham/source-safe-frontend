import { Typography } from "components/atoms";
import React, { ReactNode, useMemo } from "react";

interface getTitleProps {
  title: ReactNode;
  className?: string;
}

export const useGetTitle = ({ title, className }: getTitleProps) => {
  const getTitle = useMemo(() => {
    return (
      <>
        <Typography.Title className={className}>{title}</Typography.Title>
      </>
    );
  }, [title]);

  return { getTitle };
};
