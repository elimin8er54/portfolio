import React, { useState, useEffect } from "react";
import styles from "../../styles.scss";
import flip from "../../flipper.scss";
import Helper from "../../helpers/helper";
const Home = () => {
  /**
   * This is the home page. @see index.tsx
   * This is a componenet that swaps out in the parent Body componenet
   */
  const images = Helper.loadImages([require("../../../public/images/face.jpg"),]);

  const [imgLoaded, setImagLoaded] = useState(false);

  useEffect(() => {
    images.then(() => {
      setImagLoaded(true);
    });
  }, []);

  return (
    <>
      <section>
        <header>
          <h1 className={styles.boxText}>
            Welcome to
            my
            <span style={{ display: "block" }} className={styles.secondaryColor}>
              portfolio
            </span>

            <span className={styles.smolText}>
              (That I only spent 4 days making)
            </span>
          </h1>
        </header>
        <h2 className={styles.me}>
          I am a
          <br />
          Programmer.     Designer.     Web Developer.
        </h2>
      </section>
      <section>
        <header>

          {imgLoaded && <h2 style={{ position: "absolute", left: 0, right: 0, marginTop: "80px" }} > Hello :) </h2>}

          <div className={`${flip.palette} ${styles.circularLandscape}`}>

            <img style={{ borderRadius: "50%" }} className={flip.palette__cover} src={require("../../../public/images/face.jpg")} />

          </div>
          <div className={flip.palette__cover__top}> </div>
        </header>
        <div style={{ display: "flex" }}>
          <p className={styles.myInfo} style={{ width: "50%" }}> shaunt.hire@gmail.com </p>
          <p className={styles.myInfo} style={{ width: "50%" }}> ‪(781) 530-4483‬ </p>
        </div>


      </section>
    </>
  )
};


export default Home;
