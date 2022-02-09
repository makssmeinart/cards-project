import React, {
    DetailedHTMLProps,
    InputHTMLAttributes,
    useState,
} from "react";
import {SuperInputText} from "../superInput/SuperInput";
import s from "./superPasswordInput.module.css"
import hidePass from "../../../../../f3-assets/images/icons/hidePass.svg"

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement>;

type SuperInputTextPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void;
    onEnter?: () => void;
    error?: string;
    labelValue?: string
};

export const SuperPasswordInput: React.FC<SuperInputTextPropsType> = ({
                                                                          // type,
                                                                          onChange,
                                                                          onChangeText,
                                                                          onKeyPress,
                                                                          onEnter,
                                                                          error,
                                                                          className,
                                                                          labelValue,
                                                                          ...restProps
                                                                      }) => {

        const [reverseType, setReverseType] = useState<"password" | "text">("password");

        const onClickHandler = () => {
            if (reverseType === "password") {
                setReverseType("text");
            } else if (reverseType === "text") {
                setReverseType("password");
            }
        };

        return (
            <>
                <div className={s.wrapper}>
                    <SuperInputText labelValue={"Password"}
                                    onChange={onChange}
                                    type={reverseType}
                                    value={restProps.value}
                                    onBlur={restProps.onBlur}
                                    name={restProps.name}
                                    isPassword={true}
                    />
                    <button type={"button"} className={s.visible} onClick={onClickHandler}>
                        <img src={hidePass} alt=""/>
                    </button>
                </div>
            </>
        );
    }
;
