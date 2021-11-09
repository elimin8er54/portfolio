import React, { useState, useEffect } from "react";
import styles from "../../styles.scss";
import FadeInSection from "../wrapper/FadeInSection";
import { Skeleton } from '@material-ui/lab';
import CoolBox from "./CoolBox";
import ImagePopup from "./ImagePopup";
import Helper from "../../helpers/helper";

const photos = [
    require("../../../public/images/1.png"),
    require("../../../public/images/2.png"),
    require("../../../public/images/3.png"),
    require("../../../public/images/5.png"),
    require("../../../public/images/6.png")
]


const About = () => {
    /**
     * This is the home page. @see index.tsx
     * This is a componenet that swaps out in the parent Body componenet
     */
    const [imageLoaded, setImageLoaded] = useState(false);
    const [scrolledDown, setScrolledDown] = useState(false);
    const images = Helper.loadImages(photos);
    const [showPopup, setShowPopup] = useState(false);
    const [currentImage, setCurrentImage] = useState("");

    useEffect(() => {
        images.then(() => {
            setImageLoaded(true);
        });
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);
    const handleScroll = () => {

        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 200) {

            setScrolledDown(true);
        } else {
            setScrolledDown(false);
        }
    };

    const showBigImage = (event: React.MouseEvent<HTMLImageElement>) => {
        setShowPopup(true);
        setCurrentImage(event.currentTarget.src);
    }

    return (
        <>
            {showPopup && <ImagePopup onOutsideClick={() => { setShowPopup(false) }} src={currentImage} />}
            {scrolledDown &&
                <object style={{ width: "500px", position: "fixed", backgroundColor: "transparent", bottom: "-100px", zIndex: 3, right: "0px" }} type="image/svg+xml" data={require("../../../public/images/star.svg")}></object>}
            <section>
                <header>
                    <h1 className={`${imageLoaded && styles.boxTextebase} ${styles.boxTexttitleabout}`}>
                        About Me
                    </h1>
                </header>
                <h2 className={styles.boxTexteabout}>
                    <div style={{ overflow: "hidden", width: "100%", height: "100%" }}>
                        <FadeInSection>
                            <span style={{ display: "block" }}>I studied Computer Science at Umass Lowell (2 Semesters) and Mass Bay Community College.</span>
                            <span style={{ display: "block" }}>After my first semester of college I began to love the idea of becoming a Web Developer.</span>
                            <span style={{ display: "block" }}>During that time my stack was Java, PHP, Bootstrap, jQuery, MySQL. Now I am learning a new technology constantly!</span>
                            <span style={{ display: "block" }}>For example this site uses NodeJS, SCSS, JS ES6, Express, Typescript, Functional React, MaterialUI, and AWS </span>
                            <span style={{ display: "block" }}>There is so much tech to learn that I tend to jump from one tech to another instead of creating full personal projects.</span>
                        </FadeInSection>
                    </div>
                </h2>
            </section>
            <div style={{ alignContent: "center", width: "100%" }}>
                <span style={{ border: "4px solid red" }}> </span>
            </div>
            <section>
                <header>
                    <h1 className={styles.aboutBottom}>

                        Some photos of my paid work of the user login portal that you would not normally see
                    </h1>
                </header>
                <div className={styles.flexWrap}>

                    <>
                        <div className={`${styles.imageHolder}  ${imageLoaded && styles.isVisible}`}>
                            {imageLoaded ? <img onClick={showBigImage} src={require("../../../public/images/1.png")} className={styles.imageInside} />

                                : <Skeleton variant="rect" width={220} height={160} />}
                        </div>
                        <div className={`${styles.imageHolder} ${imageLoaded && styles.isVisible}`}>
                            {imageLoaded ? <img onClick={showBigImage} src={require("../../../public/images/2.png")} className={styles.imageInside} />
                                : <Skeleton variant="rect" width={220} height={160} />}  </div>
                        <div className={`${styles.imageHolder} ${imageLoaded && styles.isVisible}`}>
                            {imageLoaded ? <img onClick={showBigImage} src={require("../../../public/images/3.png")} className={styles.imageInside} />
                                : <Skeleton variant="rect" width={220} height={160} />}  </div>
                        <div className={`${styles.imageHolder} ${imageLoaded && styles.isVisible}`}>
                            {imageLoaded ? <img onClick={showBigImage} src={require("../../../public/images/5.png")} className={styles.imageInside} />
                                : <Skeleton variant="rect" width={220} height={160} />}  </div>
                        <div className={`${styles.imageHolder} ${imageLoaded && styles.isVisible}`}>
                            {imageLoaded ? <img onClick={showBigImage} src={require("../../../public/images/6.png")} className={styles.imageInside} />
                                : <Skeleton variant="rect" width={220} height={160} />}  </div>
                    </>


                </div>

                <div style={{ marginTop: "100px" }} className={styles.slideContainer}>


                    <div className={styles.innerslideContainerBottom}  > </div>
                    <div style={{ width: "70%", textAlign: "left", left: "0px", textDecoration: "underline", textDecorationColor: "rgb(216, 17, 17)" }} className={styles.innerText}> Tech used at work</div>
                </div>



                <div style={{ marginTop: "100px" }}>
                    <FadeInSection delay={1000}>
                        <CoolBox title={"Hybrid"} names={["Javascript ES6", "Typescript", "Java"]} />
                    </FadeInSection>
                </div>


                <div style={{ marginTop: "30px" }}>
                    <FadeInSection delay={1000}>
                        <CoolBox title={"Frontend"} names={["React", "React-pdf", "React Router", "jQuery", "HTML", "CSS", "SCSS", "Bootstrap", "Material UI", "Babel", "Webpack"]} />
                    </FadeInSection>
                </div>



                <div style={{ marginTop: "30px" }}>
                    <FadeInSection delay={1000}>
                        <CoolBox title={"Backend"} names={["NodeJS", "bcryptjs", "jsonwebtoken", "nodemailer", "Express", "cURL", "Multer", "PHP", "AWS SDK", "Wordpress", "API Endpoints", "Rest API", "MySQL", "MongoDB"]} />
                    </FadeInSection>
                </div>


                <div style={{ marginTop: "30px" }}>
                    <FadeInSection delay={1000}>
                        <CoolBox title={"CI/CD Pipeline"} names={["Docker", "Terraform", "GitHub", "GitHub Actions", "Travis CI"]} />
                    </FadeInSection>
                </div>


                <div style={{ marginTop: "30px" }}>
                    <FadeInSection delay={1000}>
                        <CoolBox title={"Testing"} names={["Mocha", "Chai", "Jest", "Selenium", "HTMLUnit"]} />
                    </FadeInSection>
                </div>



                <div style={{ marginTop: "30px" }}>
                    <FadeInSection delay={1000}>
                        <CoolBox title={"AWS"} names={["EC2", "S3", "CloudFront", "ECS", "Route 53", "CloudWatch", "Lambda", "Load Balancer", "Auto Scaling"]} />
                    </FadeInSection>
                </div>





                <div style={{ height: "250px" }} >    </div >


            </section>
        </>
    );
};

export default About;
