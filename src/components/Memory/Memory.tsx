import React, { useEffect, useState, useRef } from "react";
import Card from "./Card"
import styles from "../../styles.scss";
import GamingIcon from "@material-ui/icons/SportsEsports";
import MailIcon from "@material-ui/icons/Mail";
import PeopleIcon from "@material-ui/icons/People";
import HouseIcon from "@material-ui/icons/House";
import BedtimeIcon from "@material-ui/icons/Cake";
import FastFoodIcon from "@material-ui/icons/Fastfood";

const shuffle = (array: any) => {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

enum Status {
    DOWN,
    GOOD,
    WAITING
}

enum Game {
    PLAYING,
    WIN,
    LOSE
}

const MAX_ATTEMPTS = 6;
const FLIPSWIN = 6;

const cardSet = [
    { key: 1, uid: 1, id: 1, isFlipped: false, src: <GamingIcon className={styles.svgIcon} />, status: Status.DOWN },
    { key: 2, uid: 2, id: 1, isFlipped: false, src: <GamingIcon className={styles.svgIcon} />, status: Status.DOWN },
    { key: 3, uid: 3, id: 2, isFlipped: false, src: <MailIcon className={styles.svgIcon} />, status: Status.DOWN },
    { key: 4, uid: 4, id: 2, isFlipped: false, src: <MailIcon className={styles.svgIcon} />, status: Status.DOWN },
    { key: 5, uid: 5, id: 3, isFlipped: false, src: <PeopleIcon className={styles.svgIcon} />, status: Status.DOWN },
    { key: 6, uid: 6, id: 3, isFlipped: false, src: <PeopleIcon className={styles.svgIcon} />, status: Status.DOWN },
    { key: 7, uid: 7, id: 4, isFlipped: false, src: <HouseIcon className={styles.svgIcon} />, status: Status.DOWN },
    { key: 8, uid: 8, id: 4, isFlipped: false, src: <HouseIcon className={styles.svgIcon} />, status: Status.DOWN },
    { key: 9, uid: 9, id: 5, isFlipped: false, src: <BedtimeIcon className={styles.svgIcon} />, status: Status.DOWN },
    { key: 10, uid: 10, id: 5, isFlipped: false, src: <BedtimeIcon className={styles.svgIcon} />, status: Status.DOWN },
    { key: 11, uid: 11, id: 6, isFlipped: false, src: <FastFoodIcon className={styles.svgIcon} />, status: Status.DOWN },
    { key: 12, uid: 12, id: 6, isFlipped: false, src: <FastFoodIcon className={styles.svgIcon} />, status: Status.DOWN }];


const Memory = () => {

    const ref = useRef({
        flips: 0,
        counter: 0,
        idChecker: []
    });
    const [attempts, setAttempts] = useState(MAX_ATTEMPTS);
    const [cardInfo, setCardInfo] = useState([]);
    const [canClick, setCanClick] = useState(true);
    const [game, setGame] = useState(Game.PLAYING);

    useEffect(() => {
        shuffle(cardSet);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (cardInfo.length < 12) {
                setCardInfo([...cardInfo, cardSet[ref.current.counter]]);
                ref.current.counter++;
            }
        }, 70);

        return () => {
            clearTimeout(timer);
        }
    }, [cardInfo])

    let pendingCount = 0;
    cardInfo.forEach((items) => {

        if (items.status === Status.WAITING) {
            pendingCount++;
        }
    });

    const flipCard = (id: number, uid: number) => {
        if (pendingCount !== 2 && canClick) {
            ref.current.idChecker.push(id);

            setCardInfo(cardInfo.map((items) => {
                let newFlip = items.isFlipped;
                let status = items.status;
                if (items.uid === uid) {
                    newFlip = true;
                    status = Status.WAITING;
                }
                return { key: items.key, uid: items.uid, id: items.id, isFlipped: newFlip, src: items.src, status: status };
            }));

            //Once the second card is flipped, compare results
            if (typeof ref.current.idChecker[1] !== 'undefined') {

                if (ref.current.idChecker[0] === ref.current.idChecker[1]) {
                    //If the 2 cards match id
                    setCardInfo(cardInfo.map((items) => {
                        let status = items.status;
                        let flipped = items.isFlipped;
                        if (items.id === ref.current.idChecker[1]) {
                            flipped = true;
                            status = Status.GOOD
                        }
                        return { key: items.key, uid: items.uid, id: items.id, isFlipped: flipped, src: items.src, status: status };
                    }));
                    ref.current.flips++;
                    if (ref.current.flips === FLIPSWIN) {
                        // alert("You win");
                        setGame(Game.WIN);
                    }
                } else {
                    //If the 2 cards do not match id

                    setTimeout(() => {
                        setCardInfo(cardInfo.map((items) => {
                            let newFlip = items.isFlipped;
                            let status = items.status;

                            if (items.status === Status.WAITING) {
                                newFlip = false;
                                status = Status.DOWN;
                            }
                            return { key: items.key, uid: items.uid, id: items.id, isFlipped: newFlip, src: items.src, status: status };
                        }));

                        const newAttempt = attempts - 1;
                        setAttempts(newAttempt);
                        if (newAttempt === 0) {
                            setCanClick(false);
                            ref.current.flips = 0;
                            setAttempts(MAX_ATTEMPTS);
                            setCardInfo(cardInfo.map((items) => {
                                return { key: items.key, uid: items.uid, id: items.id, isFlipped: false, src: items.src, status: Status.DOWN };
                            }));
                            alert("You Lose... so you get this ugly popup.");

                            setTimeout(() => {
                                shuffle(cardSet);
                                setCardInfo(cardSet);
                                ref.current.counter = 0;
                                //setCardInfo([]);
                                setCanClick(true);
                            }, 550)
                        }
                    }, 1000)
                }
                //Reset back to empty after the second flip no matter what
                ref.current.idChecker = [];

            }
        }
    }

    const cards = cardInfo.map((info) => {
        return <Card id={info.id} key={info.key} uid={info.uid} isFlipped={info.isFlipped} src={info.src} doesClick={flipCard} />
    });

    return (
        <>
            {game === Game.WIN && <h1 className={styles.winText} >YOU WIN!</h1>}
            <section>
                <header>
                    <h2 style={{ position: "absolute", marginTop: "-5px" }}>Memory</h2>
                    <h2 style={{ marginTop: "40px", color: "red", borderBottom: "2px solid red" }}>Attemps: {attempts}</h2>
                </header>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {cards}
                </div>
            </section>
        </>
    );
};

export default Memory;
