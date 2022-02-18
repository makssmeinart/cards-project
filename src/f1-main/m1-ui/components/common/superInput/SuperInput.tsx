import React, {
    ChangeEvent,
    DetailedHTMLProps,
    InputHTMLAttributes,
    KeyboardEvent,
} from "react";
import "./supeInput.css"

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement>;

type SuperInputTextPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void;
    onEnter?: () => void;
    error?: string;
    labelValue?: string
    isPassword?: boolean
};

export const SuperInputText: React.FC<SuperInputTextPropsType> = ({
                                                                      // type,
                                                                      onChange,
                                                                      onChangeText,
                                                                      onKeyPress,
                                                                      onEnter,
                                                                      error,
                                                                      className,
                                                                      labelValue,
                                                                      isPassword,
                                                                      ...restProps
                                                                  }) => {
        const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
            onChange && onChange(e);
            onChangeText && onChangeText(e.currentTarget.value);
        };
        const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
            onKeyPress && onKeyPress(e);
            onEnter && e.key === "Enter" && onEnter();
        };

        const customMargin = isPassword ? "45px" : "0"

        return (
            <>
                <div
                    className="searchformfld">
                    <input
                        style={{paddingRight: customMargin}}
                        type="text"
                        className="candidateName"
                        id="candidateName"
                        name={restProps.name}
                        placeholder=" "
                        onChange={onChangeCallback}
                        onKeyPress={onKeyPressCallback}
                        {...restProps}
                    />
                    <label htmlFor={restProps.name}>{labelValue}</label>
                </div>

            </>
        );
    }
;


