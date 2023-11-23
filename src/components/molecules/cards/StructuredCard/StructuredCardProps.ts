import { CardProps } from "components/atoms/Card";
import { useCardSelectionProps } from "hooks/useCardSelection/useCardSelectionProps";
import { ReactElement, ReactNode } from "react";
import { ContentType } from "types/Content.type";

export interface StructuredCardProps extends CardProps {
  icon:
    | ReactElement
    | {
        Component: ReactElement;
        cols: number;
      };
  actions?: ReactNode[];
  badge?: ReactElement;
  height?: number;
  content?: ContentType;
  selectConfig?: {
    selectionMode: boolean;
    cardSelected: boolean;
    onChange: any;
  };
  testprops?: useCardSelectionProps;
}
