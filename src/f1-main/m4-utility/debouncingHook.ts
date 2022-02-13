import React, { useState, useEffect } from 'react';

export const debounceGovno = (func: any, wait: number) => {
    let timeout: any;
    return function(...args: any) {
        // @ts-ignore
        const context = this;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            timeout = null;
            func.apply(context, args);
        }, wait);
    };
};