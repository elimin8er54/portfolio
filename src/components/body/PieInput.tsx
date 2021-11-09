import React, { useEffect, useState } from "react";
import TextField from '@material-ui/core/TextField';

type Props = {
    id: number;
    amount: string;
    name: string;
    isChanged: (currentAmount: string, currentName: string, id: number) => void;
}

const PieInput: React.FC<Props> = ({ id, amount, isChanged, name }) => {

    const [currentAmount, setCurrentAmount] = useState(amount);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!isNaN(parseInt(event.target.value, 10))) {
            isChanged(event.target.value, name, id);
        }
        setCurrentAmount(event.target.value);
    }
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField autoComplete={"off"} style={{ width: "100%" }} value={currentAmount} onChange={handleChange} id="standard-basic" label={name} variant="standard" />
        </div>
    )
}

export default PieInput;