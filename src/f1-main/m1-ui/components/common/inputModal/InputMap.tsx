import React, {CSSProperties, useEffect, useMemo, useState} from 'react';

export type IInputData = [string, (value: string) => void];

interface IInputMap {
    inputData?: IInputData[];
    setSaveInputs: (fObject: {f: () => void}) => void // subscribe

    inputStyles?: CSSProperties;
}

const InputMap: React.FC<IInputMap> = (
    {
        inputData,
        setSaveInputs,

        inputStyles,
    }
) => {
    const defAnswersData = useMemo(() => {
        return inputData ? inputData.map((iD, i) => ({id: i, value: iD[0], setValue: iD[1]})) : [];
    }, []);
    const [modalInputData, setModalInputData] = useState(defAnswersData);

    const setInputData = (id: number, value: string) => {
        setModalInputData(modalInputData.map(iD => iD.id === id ? {...iD, value} : iD));
    };
    useEffect(() => {
        setSaveInputs({f: successCloseModal}) // subscribe
    }, [modalInputData]);

    const successCloseModal = () => {
        for (const iD of modalInputData) iD.setValue(iD.value);
    };

    return (
        <>
            {modalInputData.map(iD => (
                <input
                    key={iD.id}
                    value={iD.value}
                    style={{...inputStyles}}
                    onChange={e => setInputData(iD.id, e.currentTarget.value)}
                />
            ))}
        </>
    );
};

export default InputMap;