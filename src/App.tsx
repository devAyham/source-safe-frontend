import {Provider} from "react-redux/es/exports";
import store from "./redux/store";
import "styles/global/App.scss";
import Main from "Main";
import {HashRouter} from "react-router-dom";
import CustomQueryClientProvider from "providers/CustomQueryClientProvider/CustomQueryClientProvider";
import CookiesProvider from "providers/CookiesProvider/CookiesProvider";
import CustomErrorBoundary from "features/common/Errors/CustomErrorBoundary/CustomErrorBoundary";
import LoadingProvider from "./providers/IsLoadingProvider/LoadingProvider";

function App() {
    return (
        <>
            <HashRouter>
                <CustomErrorBoundary>
                    <Provider store={store}>
                        <CustomQueryClientProvider>
                            <CookiesProvider>
                                <LoadingProvider>
                                    <Main/>
                                </LoadingProvider>
                            </CookiesProvider>
                        </CustomQueryClientProvider>
                    </Provider>
                </CustomErrorBoundary>
            </HashRouter>
        </>
    );
}

export default App;
