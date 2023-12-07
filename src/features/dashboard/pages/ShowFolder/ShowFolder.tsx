import {
  useAppDispatch,
  useAppSelector,
} from "features/common/hooks/useReduxHooks";
import { ShearedDataSliceActions } from "features/common/redux/slices/shearedDataSlices";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PagesRotes } from "router/constants/pagesRoutes";

function ShowFolder() {
  const { id } = useParams<{ id: string }>();
  const { contentInfo } = useAppSelector((state) => state.sharedData);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { Reset, SetFolderId } = ShearedDataSliceActions;

  useEffect(() => {
    console.log(Number(id));
    if (Number(id) > 0) {
      dispatch(SetFolderId(Number(id)));
    } else {
      navigate(PagesRotes.DashboardRoutes.MyFolders.index);
    }
    return () => {
      dispatch(Reset());
    };
  }, [id]);

  return <div>ShowFolder</div>;
}

export default ShowFolder;
