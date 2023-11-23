import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "redux/store";
/**
 * Use throughout your app instead of plain `useDispatch` and `useSelector`
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
/**
 * Use throughout your app instead of plain `useDispatch` and `useSelector`
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
