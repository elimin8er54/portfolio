import React, { useEffect, useState } from "react";
import Circle from "./Circle";
import Test from "./Test";
import styles from "../../styles.scss";
import Prism from "prismjs";
import PieInput from "./PieInput";



const Sample = () => {

    const [highlightReady, setHighlightReady] = useState(false);
    const [pieNumbers, setPieNumbers] = useState([
        { id: 1, name: "Cars", amount: 123 },
        { id: 2, name: "Bagels", amount: 223 },
        { id: 3, name: "Yo", amount: 50 }]);

    useEffect(() => {
        Prism.highlightAll();
        setHighlightReady(true);
    }, []);


    const longCode = `import React, { useEffect, useRef } from "react";

    interface Props extends React.HTMLProps<HTMLCanvasElement> {
        values: Slice[];
        radius?: number;
        h?: number;
        k?: number;
        steps?: number;
    }
    
    type Slice = {
        name: string;
        amount: number;
        customFont?: number;
    }
    
    const Circle: React.FC<Props> = ({
        values,
        radius,
        h,
        k,
        steps,
        ...props }) => {
    
        useEffect(() => {
            createPie();
        });
    
        const canvasRef = useRef(null);
    
        const createPie = () => {
    
            //We set up a ref to the canvas so we can work with it.
            let canvas = canvasRef.current;
    
            //We set inital values for optional props if they are not set by the parent
            radius = radius || canvas.width / 2.15;
            h = h || canvas.width / 2;
            k = k || canvas.height / 2;
            steps = steps || 5000;
            const fullCircle = Math.PI;
            const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            //The more we increase steps the smoother the circle will be
            const step = 2 * fullCircle / steps;
            const total = values.reduce((prev, current) => {
                return prev + current.amount
            }, 0);
            let angle = 0;
            let oldAngle = 0;
            let last = 0;
            let x = 0;
            let y = 0;
            let oldX = 0;
            let oldY = 0;
    
            values.forEach((item) => {
                if (item.amount > 0) {
                    item.customFont = item.customFont || 25;
                    ctx.beginPath();
                    const percent = item.amount / total;
                    for (; angle < (fullCircle * 2) *
                        (percent + last); angle += step) {
                        x = h + radius * Math.cos(angle);
                        y = k - radius * Math.sin(angle);
                        ctx.lineTo(x, y);
                    }
                    ctx.shadowColor = 'black';
                    ctx.shadowBlur = 15;
                    oldX = h + radius * Math.cos((angle + oldAngle) / 2);
                    oldY = k - radius * Math.sin((angle + oldAngle) / 2);
                    oldAngle = angle;
                    last += percent;
                    ctx.lineTo(h, k);
                    ctx.strokeStyle = 'rgba(0,0,0,0)';
                    ctx.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
                    ctx.fill();
                    ctx.fillStyle = "#303030";
                    ctx.shadowBlur = 0;
                    const textString = item.name;
                    ctx.font = \`\${item.customFont}px serif\`;
                    const textWidth = ctx.measureText(textString).width;
                    const textHeight = ctx.measureText('M').width;
    
                    //Use the Perpendicular Bisector of Two Points to get the center
                    //Each text is the center of the circle added with center of each curve divided by 2
                    const midPointX = ((h + oldX) / 2);
                    const midPointY = ((k + oldY) / 2);
                    //Dont show the text if it's too smal
                    if (percent > .10) {
                        ctx.fillText(textString, midPointX - textWidth / 2, midPointY);
                        ctx.font = \`\${item.customFont - 10}px serif\`;
                        ctx.fillText(\`\${item.amount.toString()} (\${Math.round(percent * 100 * 100) / 100}%)\`,
                            (midPointX - textWidth / 2), midPointY + textHeight);
                    }
                    ctx.closePath();
                    ctx.stroke();
                }
            });
    
        }
    
        return (
            <>
                <canvas {...props} ref={canvasRef}></canvas>
            </>
        )
    }
    
    export default Circle;`

    const visible = highlightReady ? "visible" : "hidden";

    const handleChange = (newAmount: string, newName: string, id: number) => {
        const pieValues = pieNumbers.map((current) => {
            const amount = current.id === id ? parseInt(newAmount, 10) : current.amount
            return { id: current.id, name: current.name, amount: amount }
        });
        setPieNumbers(pieValues);
    }
    const pieInputValues = pieNumbers.map((current, i) => {
        return <PieInput key={i} id={current.id} name={current.name} amount={current.amount.toString()} isChanged={handleChange} />
    });

    return (
        <>
            <section>
                <header>
                    <h1 className={styles.pieTitle}>   Sample code of a simple React component
                        that takes in an array of objects and outputs
                        a pie chart using canvas. Edit the boxes to see the chart change real time.
                    </h1>
                    <div style={{ height: "10px", width: "40px", left: "50%", right: "50%", backgroundColor: "red", margin: "auto" }}> </div>
                    <h1 className={styles.pieTitle}>
                        (With more time I would move the text outside of the Pie Chart so they do not go out of bounds) </h1>
                </header>
                <div className={styles.sampleFlex} >
                    <div className={styles.code}>

                        <pre style={{ visibility: visible }}>
                            <code className="language-javascript" >
                                {longCode}
                            </code>
                        </pre>
                    </div>
                    <div className={styles.pieContainer}>
                        <div className={styles.pie}>
                            <Circle height={300} width={300} values={pieNumbers}
                            />

                        </div>
                        <div >
                            <div style={{ alignContent: "center", margin: "20px", justifyContent: "center", display: "flex" }}>
                                {pieInputValues}

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

export default Sample;