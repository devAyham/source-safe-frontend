import { HttpStatus } from "api/constants/httpStatusCodes";
import { AxiosError } from "axios";
import {
  useAppDispatch,
  useAppSelector,
} from "features/common/hooks/useReduxHooks";
import { ShearedDataSliceActions } from "features/common/redux/slices/shearedDataSlices";
import { useFolderApi } from "services/folderService";

function Component() {
  const { activeFolderId } = useAppSelector(
    (state) => state.sharedData.contentInfo
  );
  const dispatch = useAppDispatch();
  const { SetFolderId } = ShearedDataSliceActions;
  const {
    getDetailsEntity: { data, isLoading },
  } = useFolderApi({
    getDetailsConfig: {
      id: activeFolderId ? activeFolderId : 0,
      enabled: !!activeFolderId,
      onError(error: any) {
        if (error.response?.status === HttpStatus.NotFound) {
          dispatch(SetFolderId(null));
        }
      },
    },
  });
  return <div>Folder</div>;
}

export default Component;
