
export const promiseTimeout = (time: number) => new Promise(
    (resolve, reject) => {
        setTimeout(resolve, time);
    });


