import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles.scss";

interface Props {
  children: {};
  delay?: number;
}

function FadeInSection(props: Props) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  const imageScroll = () => {

    let newDelay = 0;

    if (props.delay) {
      newDelay = props.delay
    }


    if (isInViewport(domRef.current)) {
      setVisible(true);

    }



  };


  function isTopOfPage() {
    var yPosition = window.pageYOffset;

    if (yPosition == 0) {
      //top of page
      return true;
    }
    else if (yPosition > 0) {
      // not at the top of the page
      return false;
    }
  }

  function isInViewport(el: HTMLElement) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top + 100 <=
      (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  useEffect(() => {

    if (isTopOfPage) {
      imageScroll();
    }

    window.addEventListener("scroll", imageScroll);
    return () => { window.removeEventListener("scroll", imageScroll); };
  }, []);
  return (

    <div
      className={`${styles.fadeInSection} ${isVisible ? styles.isVisible : ""}`}
      ref={domRef}
    >
      {props.children}
    </div>

  );
}

export default FadeInSection;
