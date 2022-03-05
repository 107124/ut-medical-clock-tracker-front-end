import * as React from "react";

const StampItem = props => {
    const [date, setDate] = React.useState("");
    const [time, setTime] = React.useState("");

    const handleDate = () => {
        fetch(props.stamps.date).then(
            response => response.json().then(
                data => setDate(data)
            )
        )
    }

    const handTime = () => {
        fetch(props.stamps.time).then(
            response => response.json().then(
                data => setTime(data)
            )
        )
    }


    return (
        <div className="stamp-item-container">
            <div className="stamp">
                {/* <p>{props.stamp.date}</p> */}
                {/* <p>{handleDate()}</p>
                <p>{handTime()}</p> */}
                <p>stamp item</p>
            </div>
        </div>
    )

}

export default StampItem;