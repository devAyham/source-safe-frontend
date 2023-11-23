import { Col } from "antd";
import Filter, { FilterProps } from "features/common/components/Filter/Filter";
import SearchInput, {
  SearchInputProps,
} from "features/common/components/Inputs/searchInput/SearchInput";
import Sorter, { SorterProps } from "features/common/components/Sorter/Sorter";
import { isValidElement, ReactNode, useMemo } from "react";
import {
  ControlActionConfigProps,
  ControlActionProps,
} from "../PageHeaderProps";
import isValidReactNode from "../../../../helpers/isValidReactNode";

interface getControlActionsProps {
  controlActions?: ControlActionProps;
  Scol?: string;
  SsearchCol?: string;
  SFilter?: string;
  SextraActions?: string;
}
export const useGetControlActions = ({
  SFilter,
  Scol,
  SsearchCol,
  controlActions,
  SextraActions,
}: getControlActionsProps) => {
  const getControlActions = useMemo(() => {
    if (isValidElement(controlActions)) {
      return controlActions;
    } else {
      let CSearch;
      let CSorter;
      let CFilter;
      let CExtra;
      const { extraAction, filter, search, sorter } =
        (controlActions as ControlActionConfigProps) ?? {};
      if (search) {
        if (isValidReactNode(search)) {
          CSearch = search;
        } else {
          const props = search as SearchInputProps;
          CSearch = <SearchInput {...props} />;
        }
      }
      if (sorter) {
        if (isValidReactNode(sorter)) {
          CSorter = sorter;
        } else {
          const props = sorter as SorterProps;
          CSorter = <Sorter {...props} />;
        }
      }
      if (filter) {
        if (isValidReactNode(filter)) {
          CFilter = filter;
        } else {
          const props = filter as FilterProps;
          CFilter = <Filter {...props} />;
        }
      }
      if (extraAction) {
        if (isValidReactNode(extraAction)) {
          const className = CSearch ? Scol : SextraActions;
          CExtra = <Col className={className}>{extraAction}</Col>;
        } else if (extraAction instanceof Array<ReactNode>) {
          CExtra = extraAction.map((action) => {
            <Col className={Scol}>{action}</Col>;
          });
        }
      }
      return (
        <>
          {CSearch && (
            <Col
              className={SsearchCol}
              xs={{
                span: 24,
                order: 10,
              }}
              md={{
                span: 8,
                order: 0,
              }}
              lg={6}
            >
              {CSearch}
            </Col>
          )}
          {CExtra}
          {CSorter && <Col className={Scol}>{CSorter}</Col>}
          {CFilter && <Col className={SFilter}>{CFilter}</Col>}
        </>
      );
    }
  }, [controlActions]);

  return { getControlActions };
};
