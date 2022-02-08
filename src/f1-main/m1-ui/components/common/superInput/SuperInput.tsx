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

        console.log(restProps.value)

        return (
            <>
                <div className="searchformfld">
                    <input
                        type="text"
                        className="candidateName"
                        id="candidateName"
                        name="candidateName"
                        placeholder=" "
                        onChange={onChangeCallback}
                        onKeyPress={onKeyPressCallback}
                        {...restProps}
                    />
                    <label htmlFor="candidateName">Candidate name</label>
                </div>

            </>
        );
    }
;


