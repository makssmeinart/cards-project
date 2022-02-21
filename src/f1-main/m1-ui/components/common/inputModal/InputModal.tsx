import React, {CSSProperties, ReactNode, useState} from 'react';
import Modal from "../modal/Modal";
import InputMap, {IInputData} from "./InputMap";

interface IModalInput {
    show: boolean;
    close: () => void;

    inputData?: IInputData[];
    answer?: string;
    setAnswer?: (answer: string) => void;

    inputContainerStyles?: CSSProperties;
    inputStyles?: CSSProperties;
    buttonStyles?: CSSProperties;
    button?: ReactNode;

    enableBackground?: boolean;
    backgroundStyle?: CSSProperties;
    backgroundOnClick?: () => void;

    width: number;
    height: number;
    modalStyle?: CSSProperties;
    modalOnClick?: () => void;
}

const ModalInput: React.FC<IModalInput> = (
    {
        inputData,
        answer,
        setAnswer = (answer: string) => {},

        inputContainerStyles,
        inputStyles,
        buttonStyles,
        button = 'OK',

        enableBackground,
        backgroundStyle,
        backgroundOnClick = () => {},

        width,
        height,
        modalStyle,
        modalOnClick = () => {},

        show,
        close,
        children,
    }
) => {
    const [answerData, setAnswerData] = useState(answer);
    const [saveInputs, setSaveInputs] = useState({f: () => {}});

    const successCloseModal = () => {
        saveInputs.f();
        setAnswer(answerData || '');
        setSaveInputs({f: () => {}}); // unsubscribe
        close();
    };

    return (
        <Modal
            enableBackground={enableBackground}
            backgroundOnClick={() => {
                setAnswerData(answer);
                backgroundOnClick()
            }}
            backgroundStyle={backgroundStyle}

            width={width}
            height={height}
            modalOnClick={modalOnClick}
            modalStyle={modalStyle}

            show={show}
        >
            {children ? children : 'question Modal'}
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    flexFlow: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    ...inputContainerStyles,
                }}
            >
                {answer !== undefined && (
                    <input
                        value={answerData}
                        style={{...inputStyles}}
                        onChange={e => setAnswerData(e.currentTarget.value)}
                    />
                )}
                <InputMap
                    inputData={inputData}
                    setSaveInputs={setSaveInputs} // subscribe

                    inputStyles={inputStyles}
                />

            </div>
            <button onClick={successCloseModal} style={{...buttonStyles}}>{button}</button>
        </Modal>
    );
};

export default ModalInput;