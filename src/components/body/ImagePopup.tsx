import React, { useEffect, useState, useRef } from "react";
import styles from "../../styles.scss";
type Callback<T = any> = (t: T) => void;

type Props = {
    src: string
    onOutsideClick: Callback
}

type Size = number | string


const ImagePopup: React.FC<Props> = ({ src, onOutsideClick }) => {

    const [width, setWidth] = useState((window.innerWidth / 1.2) || "auto");
    const [height, setHeight] = useState(window.innerHeight / 1.2 || "auto");
    const [initial, setInitial] = useState(false);

    const ref = useRef(null);

    useEffect(() => {
        calcSize((w: Size, h: Size) => {
            setWidth(w);
            setHeight(h);
            setInitial(true);
        });


        window.addEventListener('resize', changeSize);
        window.addEventListener('click', clickOut);
        return () => {
            window.removeEventListener('resize', changeSize);
            window.removeEventListener('click', clickOut);
        }
    }, []);

    const clickOut = (e: any) => {
        if (ref.current && !ref.current.contains(e.target)) {
            onOutsideClick(src);
        }
    }

    const calcSize = (callback: any) => {
        const image = new Image();
        image.src = src;
        let tempWidth: Size = 0;
        let tempHeight: Size = 0;
        image.onload = () => {

            if (image.width > image.height) {

                tempHeight = window.innerHeight;
                const tWidth = image.width / image.height;
                tempWidth = tWidth * tempHeight

                if (image.width > window.innerWidth) {
                    tempWidth = window.innerWidth / 1.2;
                    tempHeight = image.height / image.width * (tempWidth / 1.2)
                }

            }
            callback(tempWidth, tempHeight);
        }
    }
    const changeSize = () => {
        calcSize((w: Size, h: Size) => {
            setWidth(w);
            setHeight(h);
        });
    }

    return (
        (src !== "" && initial) && <> <div style={{ backgroundColor: "rgb(0,0,0,.8)", position: "fixed", left: 0, top: 0, zIndex: 1000, width: "100%", height: "100%" }}></div> <div style={{
            overflow: "hidden",
            left: 0, right: 0, top: 0, bottom: 0, width: width, height: height, margin: "auto", position: "fixed", zIndex: 1301
        }} className={styles.popContainer}>
            <img className={styles.imgTransform} ref={ref} src={src} style={{
                width: "99%", height: "98%",
            }} /></div></>
    )
}

export default ImagePopup;