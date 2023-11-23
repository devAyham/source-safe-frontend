import React, {useState} from 'react';
import LoadingContext from './LoadingContext';
import {LoadingContextType} from "./isLoadingProvider.interface";
interface LoadingProviderProps {
    children: React.ReactNode;
}
const LoadingProvider: React.FC<LoadingProviderProps> = ({children}) => {
    const [isEntityLoading, setIsEntityLoading] = useState(false);

    const contextValue: LoadingContextType = {
        isEntityLoading,
        setIsEntityLoading,
    };

    return <LoadingContext.Provider value={contextValue}>{children}</LoadingContext.Provider>;
};

export default LoadingProvider;