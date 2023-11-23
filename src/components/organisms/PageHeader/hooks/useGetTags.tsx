import React, { useMemo } from "react";
import { TagConfigProps, TagProps } from "../PageHeaderProps";

interface getTagsProps {
  tags?: TagProps[];
  className?: string;
  Sclickable?: string;
}
export const useGetTags = ({ tags, className, Sclickable }: getTagsProps) => {
  const getTags = useMemo(() => {
    return tags ? (
      tags.map((tag) => {
        if (React.isValidElement(tag)) {
          return <div className={className}>{tag}</div>;
        } else {
          const { icon, name, onClick, ...restProps } =
            (tag as TagConfigProps) ?? {};
          return (
            //TODO - make the tag an atom component
            <div
              className={
                onClick ? `${className} ${Sclickable}` : `${className}`
              }
              onClick={onClick}
              {...restProps}
            >
              {icon} {name}
            </div>
          );
        }
      })
    ) : (
      <></>
    );
  }, [tags]);

  return { getTags };
};
