import {Modal} from "antd";
import {useEffect, useState} from "react";
import Provider from "react-cookie/cjs/CookiesProvider";
import styles from "./styles.module.scss";
import {ReactComponent as Cookie} from "assets/svg/generalSvgs/cookie_bite_icon.svg";
import {Button} from "components";

interface CookiesProviderProps {
    children?: React.ReactNode;
}

const CookiesProvider = ({children}: CookiesProviderProps) => {
    const [isAskedCookies, setIsAskedCookies] = useState(true);
    useEffect(() => {
        if (localStorage.getItem("cookies")) {
            setIsAskedCookies(true);
        } else {
            setIsAskedCookies(false);
        }
    }, []);
    const onAccept = () => {
        localStorage.setItem("cookies", "allowed");
        setIsAskedCookies(true);
    };
    const onReject = () => {
        localStorage.setItem("cookies", "reject");
        setIsAskedCookies(true);
    };
    return (
        <>
            <Provider>{children}</Provider>
            <Modal
                closeIcon={false}
                closable={false}
                footer
                className={styles.cookiesModal}
                open={!isAskedCookies}
            >
                <div className={styles.container}>
                    <div className={styles.cookieIcon}>
                        <Cookie/>
                    </div>
                    <div>
                        <div>Cookies</div>
                        We use necessary third-party cookies to personalize content, ads,
                        and analyze site traffic.
                    </div>
                    <div className={styles.buttons}>
                        <Button type="primary" className={styles.btn} onClick={onAccept}>
                            Accept
                        </Button>
                        <Button type="primary" className={styles.btn} onClick={onReject}>
                            Reject
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default CookiesProvider;
