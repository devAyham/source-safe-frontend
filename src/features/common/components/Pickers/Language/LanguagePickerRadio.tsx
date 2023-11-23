import React, {useEffect} from "react";
import {Radio, Space} from "antd";
import {useLanguage} from "features/common/hooks/useLanguage";
import {useAppSelector} from "features/common/hooks/useReduxHooks";
import {useQueryClient} from "react-query";

/**
 *
 * @description a compact buttons langauge picker
 */
export const LanguagePicker: React.FC = () => {
    const {language, setLanguage} = useLanguage();
    const queryClient = useQueryClient();
    const refetch = () => {
        console.log(language)
        queryClient.invalidateQueries()
        // queryClient.refetchQueries()
        // queryClient.resetQueries();
    };

    useEffect(() => {
        refetch()
    }, [language])
    return (
        <div style={{width: "fit-content", margin: "auto"}}>
            <Radio.Group
                optionType="button"
                value={language}
                onChange={(e) => {
                    setLanguage(e.target.value);
                }}
            >
                <Space.Compact direction="horizontal">
                    <Radio value="en">
                        <Space align="center">English</Space>
                    </Radio>
                    <Radio value="ar">
                        <Space align="center">عربي </Space>
                    </Radio>
                </Space.Compact>
            </Radio.Group>
        </div>
    );
};
