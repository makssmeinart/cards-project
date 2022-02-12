import React, {useState} from 'react';
import {Range, getTrackBackground} from 'react-range';
import {useSelector} from "react-redux";
import {maxRangeSelector, minRangeSelector} from "../../../../m2-bll/selectors/selectAppStatus";


type IPriceRangeProps = {
    // min: number,
    // max: number
}

export const DoubleRange = (props: IPriceRangeProps) => {
    const minRange = useSelector(minRangeSelector)
    const maxRange = useSelector(maxRangeSelector)
    const [values, setValues] = useState([minRange, maxRange]);

    return (
        <Range
            values={values}
            step={5}
            min={minRange}
            max={maxRange}
            onChange={values => setValues(values)}
            renderTrack={({props, children}) => (
                <div onMouseDown={props.onMouseDown} onTouchStart={props.onTouchStart} style={{
                    ...props.style,
                        height: '36px',
                        display: 'flex',
                        width: '50%',
                        margin: '30px',
                    }}>
                    <div ref={props.ref} style={{
                        height: '5px',
                            width: '100%',
                            borderRadius: '4px',
                            background: getTrackBackground({
                                values: values,
                                colors: ['#ccc', '#548BF4', '#ccc'],
                                min: 3000,
                                max: 9000
                            }),
                            alignSelf: 'center'
                        }}>
                        {children}
                    </div>
                </div>
            )}
            renderThumb={({index, props, isDragged}) => (
                <div{...props} style={{...props.style,
                        height: '12px',
                        width: '12px',
                        borderRadius: '1px',
                        backgroundColor: '#FFF',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0px 2px 6px #AAA',
                    }}>
                    <div style={{
                            position: 'absolute',
                            top: '-28px',
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                            padding: '4px',
                            borderRadius: '4px',
                            backgroundColor: '#548BF4'
                        }}>
                        {values[index].toFixed(0)}
                        {/*// 10.12345 => 10; (1) => 10.1; (2) > 10.12; ...*/}
                    </div>
                    <div style={{
                            height: '16px',
                            width: '5px',
                            backgroundColor: isDragged ? '#548BF4' : '#CCC'
                        }}/>
                </div>
            )}
        />
    );
};

