import React, {ReactNode} from 'react';


export const Table = (props: TablePropsType) => {

    return (
        <>
            {props.children}
        </>
    );
};


type TablePropsType = {
    children: ReactNode

}