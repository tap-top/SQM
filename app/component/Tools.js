/**
 * Created by tww on 2017/5/5.
 */
'use strict';

export function  timeout(ms, promise) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error("timeout"))
        }, ms)
        promise.then(resolve, reject)
    })
}