import React, {useState} from 'react'
import ModalQuestion from "../questionModal/QuestionModal"
import {SuperButton} from "../superButton/SuperButton"

const ModalQuestionContainer: React.FC = () => {
    const [show, setShow] = useState(false)
    const [answer, setAnswer] = useState(false)

    const setTrue = () => {
        setAnswer(true)
        setShow(false)
    }
    const setFalse = () => {
        setAnswer(false)
        setShow(false)
    }

    return (
        <>
            <div>
                <SuperButton
                    className={"primaryButton"}
                    style={{width: "250px"}}
                    onClick={() => setShow(true)}
                >
                    Add new pack
                </SuperButton>
            </div>

            <ModalQuestion
                show={show}

                setTrue={setTrue}
                setFalse={setFalse}

                enableBackground={true}
                backgroundOnClick={() => setShow(false)}

                width={300}
                height={200}
            />
        </>
    );
}

export default ModalQuestionContainer