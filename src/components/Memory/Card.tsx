import React, { useState } from "react";
import styles from "../../styles.scss";

import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core/SvgIcon';


type Props = {
    src: OverridableComponent<SvgIconTypeMap<{}, "svg">>,
    id: number,
    doesClick: (id: number, uid: number) => void
    isFlipped: boolean
    uid: number
}

const Card = (props: Props) => {
    const cardClicked = () => {
        if (!props.isFlipped) {
            props.doesClick(props.id, props.uid);
        }
    }
    return (
        <span className={styles.initialCardAnim}>
            <div onClick={cardClicked} className={`${styles.flipperContainer} ${props.isFlipped && styles.flipperContainerClick}`}>
                <div className={styles.flipper} >
                    <img draggable={false} style={{ height: "100%", width: "100%" }} />
                </div>
                <div className={styles.flipperBack} >
                    <div draggable={false}>
                        {props.src}
                    </div>
                </div>
            </div>
        </span>
    );
};

export default Card;
