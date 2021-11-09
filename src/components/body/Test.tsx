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

        const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //The more we increase steps the smoother the circle will be
        const step = Math.pow(radius, 2) / steps;

        let x = (Math.pow(radius, 2) * -1);

        for (; x < Math.pow(radius, 2); x += step) {

            let y = Math.sqrt(Math.pow(radius, 2) - Math.pow(x - h, 2)) + k;


            ctx.lineTo(x, y);
        }


        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();

        x = (Math.pow(radius, 2) * -1);

        for (; x < Math.pow(radius, 2); x += step) {

            let y = (Math.sqrt(Math.pow(radius, 2) - Math.pow(x - h, 2)) * -1) + k;
            ctx.lineTo(x, y);
        }
        ctx.stroke();
    }




    return (
        <>
            <canvas {...props} ref={canvasRef}></canvas>
        </>
    )
}

export default Circle;