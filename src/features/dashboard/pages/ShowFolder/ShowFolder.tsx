import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { generateEntityCollectionQueryKey } from "api/helpers/queryKeysFactory";
import { Button, PageHeader } from "components";
import {
  useAppDispatch,
  useAppSelector,
} from "features/common/hooks/useReduxHooks";
import { ShearedDataSliceActions } from "features/common/redux/slices/shearedDataSlices";
import { AddFileModal } from "features/dashboard/components/organismis";
import { dashboardSliceActions } from "features/dashboard/redux/slices/dashboardSlice";
import { DashboardPagesType } from "features/dashboard/types/dashboardPages.type";
import { useCallback, useEffect, useState } from "react";
import { QueryClient, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { PagesRotes } from "router/constants/pagesRoutes";
import { FileLayout, FileServiceName } from "services/filesService";

function ShowFolder() {
  const resource: DashboardPagesType = "showFolder";
  const [open, setOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const {
    contentInfo: { activeFolderId },
  } = useAppSelector((state) => state.sharedData);
  const {
    showFolder: {
      search,
      pagnation: { page, perPage },
    },
  } = useAppSelector((state) => state.dashboard);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { Reset, SetFolderId } = ShearedDataSliceActions;
  const { SetPage, SetPerPage } = dashboardSliceActions;
  const queryClient = useQueryClient();
  useEffect(() => {
    if (Number(id) > 0) {
      dispatch(SetFolderId(Number(id)));
    } else {
      navigate(PagesRotes.DashboardRoutes.MyFolders.index);
    }
    return () => {
      dispatch(Reset());
    };
  }, [id]);
  const setPerPage = useCallback(
    (value: number) => dispatch(SetPerPage({ resource, value })),
    [dispatch]
  );
  const setPage = useCallback(
    (value: number) => dispatch(SetPage({ resource, value })),
    [dispatch]
  );
  return (
    <>
      <AddFileModal
        modalProps={{
          open,
          onCancel: () => {
            setOpen(false);
          },
        }}
        formProps={{
          folder_id: Number(id),
          onSuccess: () => {
            setOpen(false);
            queryClient.invalidateQueries(
              generateEntityCollectionQueryKey({
                entityType: FileServiceName,
                params: {},
              })
            );
          },
        }}
      />
      <PageHeader
        title={"Folder Informations & Files"}
        mainActions={{
          primaryAction: {
            action: (
              <Button
                type="primary"
                block
                shape="round"
                icon={<FontAwesomeIcon icon={faPlus} />}
                onClick={() => {
                  setOpen(true);
                }}
              >
                Add new File
              </Button>
            ),
            grid: {
              sm: 12,
              md: 10,
              lg: 6,
              xl: 4,
            },
          },
        }}
      />
      <FileLayout
        viewType={"list"}
        actions={{
          deleteAction: true,
        }}
        apiCrudConfig={{
          getAllConfig: {
            enabled: !!activeFolderId,
            params: {
              page,
              items_per_page: perPage,
              search: search !== "" ? search : undefined,
              folder_id: String(activeFolderId),
            },
          },
        }}
        pagination={{
          onChange(page, pageSize) {
            setPage(page);
            setPerPage(pageSize);
          },
        }}
      />
    </>
  );
}

export default ShowFolder;
