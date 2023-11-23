import { SVGProps, useEffect, useState } from "react";
import { useAppSelector } from "../hooks/useReduxHooks";
/** */
interface ImportThemeSvgInterface extends SVGProps<SVGSVGElement> {
  /** */
  src: string;
}

/**
 * @description return svg component depending on the app theme
 * @param {ImportThemeSvgInterface} param0
 * @returns {JSX.Element | null}
 */
const Component = ({ src, ...props }: ImportThemeSvgInterface) => {
  const [iconComponent, setIconComponent] = useState<JSX.Element | null>(null);
  const { theme } = useAppSelector((state) => state.ui);

  useEffect(() => {
    import(
      `assets/svg/${theme === "green" ? "greenSvgs" : "purpleSvgs"}/${src}`
    ).then((data) => {
      const obj = <img src={data.default} {...(props as any)} />;
      setIconComponent(obj);
    });
  }, []);

  return iconComponent;
};
/**
 * @description return svg path depending on the app theme
 * @param {string} src
 * @returns {string | undefined}
 */
const Path = (src: string) => {
  const [iconPath, setIconPath] = useState<string>();
  const { theme } = useAppSelector((state) => state.ui);
  useEffect(() => {
    async function loadIcon() {
      const data = await import(
        `assets/svg/${theme === "green" ? "greenSvgs" : "purpleSvgs"}/${src}`
      );
      setIconPath(data.default);
    }
    loadIcon();
  }, [src]);

  return iconPath;
};

const ImportSvg = {
  Component,
  Path,
};
export default ImportSvg;
