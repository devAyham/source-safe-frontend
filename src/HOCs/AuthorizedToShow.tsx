import { useAppSelector } from "features/common/hooks/useReduxHooks";
import { ReactNode } from "react";
import { EntityIdType } from "types";

interface Props {
  id: EntityIdType;
  children: ReactNode;
}

export const AuthorizedToShow = ({ id, children }: Props) => {
  const { user } = useAppSelector((state) => state.auth);
  return user?.id === id ? <>{children}</> : <></>;
};
