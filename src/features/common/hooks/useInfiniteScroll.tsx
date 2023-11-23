import { useEffect, useState } from "react";
/** */
interface UseInfiniteScrollProps {
  /**
   * @description should be the returned data from the `useInfinieQuery` in `react-query`
   */
  data: any;
  /** */
  status: any;
  /** */
  fetchNextPage: any;
}

/**
 * @description returning the stacked data from previuse pages compine
 * @param {UseInfiniteScrollProps} param0
 * @returns {data, onWheel}
 */
const useInfiniteScroll = ({
  data,
  fetchNextPage,
  status,
}: UseInfiniteScrollProps) => {
  const [dataSettings, setDataSettings] = useState<{
    page: number;
    loadingMore: boolean;
    options: any[];
  }>({
    page: 1,
    loadingMore: false,
    options: [],
  });

  useEffect(() => {
    if (status === "success") {
      let currentData: any = [];
      data?.pages &&
        data?.pages[0] !== undefined &&
        data?.pages.forEach((page: any) => {
          if (page?.data !== null)
            currentData = [...currentData, ...page.data.data];
        });
      let newData = dataSettings;
      newData.options = currentData;
      if (data?.pages?.[data?.pages?.length! - 1]?.data?.data?.length! > 0) {
        newData.loadingMore = false;
      } else {
        newData.loadingMore = true;
      }
      setDataSettings({ ...newData });
    }
  }, [data?.pages]);

  const onWheel = (event: any) => {
    let delta;
    const newArr = dataSettings;
    let newMin = newArr.page;
    if (event.wheelDelta) {
      delta = event.wheelDelta;
    } else {
      delta = -1 * event.deltaY;
    }

    if (!newArr.loadingMore) {
      if (delta < 0) {
        newMin = newArr.page + 1;
        let length = newArr.options.length;
        if (length !== undefined) {
          if (newMin * 4 >= length) {
            newArr.loadingMore = true;
            newArr.page = newArr.page + 1;
            // Fetch more items when the list is exhausted.
            fetchNextPage();
          }
        }
      } else if (delta > 0 && newArr.page >= 1) {
        newMin = newArr.page - 1;
      }
      newArr.page = newMin;
      setDataSettings({ ...newArr });
    }
  };

  return { data: dataSettings.options, onWheel };
};
export default useInfiniteScroll;
