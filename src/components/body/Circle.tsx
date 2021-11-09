import React, { useEffect, useRef } from "react";

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
                ctx.font = `${item.customFont}px serif`;
                const textWidth = ctx.measureText(textString).width;
                const textHeight = ctx.measureText('M').width;

                //Use the Perpendicular Bisector of Two Points to get the center
                //Each text is the center of the circle added with center of each curve divided by 2
                const midPointX = ((h + oldX) / 2);
                const midPointY = ((k + oldY) / 2);
                //Dont show the text if the pie segment too small
                if (percent > .10) {
                    ctx.fillText(textString, midPointX - textWidth / 2, midPointY);
                    ctx.font = `${item.customFont - 10}px serif`;
                    ctx.fillText(`${item.amount.toString()} (${Math.round(percent * 100 * 100) / 100}%)`,
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

export default Circle;