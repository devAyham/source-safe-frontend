import { message } from "antd";
import { useAppSelector } from "features/common/hooks/useReduxHooks";
import { request } from "libs/axios";
import { useMutation } from "react-query";
import { SessionIdType } from "types/SessionId.type";
import { useLanguage } from "../hooks/useLanguage";

/** */
//NOTE - i leave this api on old ways because a want to send params with the mutation
export interface deleteImageFunctionInterface {
  /** */
  token: string | null;
  /** */
  path: string;
  /** */
  session_id: SessionIdType;
  language: string;
}

/**
 * @description a api to delete an uploaded image from the sever session
 * @param {deleteImageFunctionInterface} param0
 * @returns
 */
const deleteImageFunction = async ({
  token,
  path,
  session_id,
  language,
}: deleteImageFunctionInterface) => {
  return request({
    url: `/delete-image`,
    method: "DELETE",
    headers: {
      "Accept-Language": language,
      Authorization: `Bearer ${token}`,
      "current-page": window.location.href,
    },
    data: {
      session_id,
    },
    params: {
      path,
    },
  });
};
/**
 * @description request api to delete an existing image from the session
 * @returns
 */
export const useDeleteImage = () => {
  const { tokens } = useAppSelector((state) => state.auth);
  const { language } = useLanguage();
  return useMutation(
    "image/delete",
    ({ path, session_id }: { path: string; session_id: SessionIdType }) => {
      return deleteImageFunction({
        token: tokens.accessToken,
        path,
        session_id,
        language,
      });
    },
    {
      onSuccess: async (response) => {
        message.success(response.data.message);
      },
    }
  );
};
