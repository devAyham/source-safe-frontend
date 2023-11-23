import { useWindowSize } from "features/common/hooks/useWindowSize";
import { useEffect } from "react";

interface useCrudViewTypeProps {
  //   viewType: viewTypeTypes;
  setViewType: any;
}
export const useCrudViewType = ({
  setViewType,
}: //   viewType,
useCrudViewTypeProps) => {
  const { width, height } = useWindowSize();
  useEffect(() => {
    if (width < 768) {
      setViewType("cards");
    }
  }, [width, height]);
};

export default useCrudViewType;
