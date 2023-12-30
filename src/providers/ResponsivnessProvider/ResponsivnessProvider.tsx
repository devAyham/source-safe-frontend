import { NotResponsiveDesign } from "components/templates/NotResponsiveDesign";
import { useWindowSize } from "features/common/hooks/useWindowSize";

/**
 * @namespace ResponsivnessProvider
 */

/**
 * @description init dirctions ,locale , theme ,and empty render component
 *   @param {any} children - wrapped components
 */
const ResponsivnessProvider = ({ children }: any) => {
  const { height, width } = useWindowSize();

  return (
    <>{width < 1300 || height < 700 ? <NotResponsiveDesign /> : children}</>
  );
};
export default ResponsivnessProvider;
