import React, { useState } from "react";
import styles from "../../styles.scss";



type Props = {
    names: string[];
    title: string;
}

const CoolBox = (props: Props) => {

    let newArray: JSX.Element[] = [];

    props.names.forEach((name: string, i: number) => {
        newArray.push(<div key={i} className={styles.myWorkInner}> {name} </div>);
    });


    return (
        <div className={styles.slideContainer}>
            <div className={styles.innerslideContainerBottomText}  > </div>
            <section>
                <header>
                    <span className={`${styles.myWorkTitle} ${styles.innerText}`}> {props.title}</span>
                </header>
                <div className={styles.myWork}>
                    {newArray}
                </div>
            </section>
        </div>
    )
}

export default CoolBox;