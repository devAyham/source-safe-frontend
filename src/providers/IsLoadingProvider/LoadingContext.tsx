import {createContext} from "react";
import {LoadingContextType} from "./isLoadingProvider.interface";

const LoadingContext = createContext<LoadingContextType>({
    isEntityLoading: false,
    setIsEntityLoading: (isLoading) => {
    }
})

export default LoadingContext;