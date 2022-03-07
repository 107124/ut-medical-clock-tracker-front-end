// import * as React from "react";
import { Component } from "react"
import React from 'react';

export default class StampPage extends Component {

    state = {
        stamps: [],
        date: "",
        time: "",
        isLoading: true
    };

    updateState = (data) => {
        this.setState({
            stamps: data,
            date: data[0]["date"],
            time: data[0]["time"],
            isLoading: false

        })
        console.log(data[0])
    }

    async componentDidMount() {
        const url = "https://ut-medical-clockin-api.herokuapp.com/stamps";
        const response = await fetch(url);
        const data = await response.json()
        this.updateState(data);
        console.log(data)
    }

    handleClockIn = (event) => {
        // event.preventDefault();
        let timeStamp = Date.now()
        let convertTime = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timeStamp);
        // let object = JSON.parse(convertTime.split())
        const listIt = convertTime.split()
        const splitted = listIt[0].split(" ")
        const date = splitted[0].replace(",", "")
        const time = splitted[1].concat(` ${splitted[2]}`)

        console.log(date, time)
        fetch('https://ut-medical-clockin-api.herokuapp.com/stamp', {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                date: `Clocked In: ${date}`,
                time: time
            })

        }).then(res => {
            console.log("New stamp attempted: ", res)
        })
    }

    handleClockOut = (event) => {
        // event.preventDefault();
        let timeStamp = Date.now()
        let convertTime = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timeStamp);
        // let object = JSON.parse(convertTime.split())
        const listIt = convertTime.split()
        const splitted = listIt[0].split(" ")
        const date = splitted[0].replace(",", "")
        const time = splitted[1].concat(` ${splitted[2]}`)

        console.log(date, time)
        fetch('https://ut-medical-clockin-api.herokuapp.com/stamp', {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                date: `Clocked Out: ${date}`,
                time: time
            })

        }).then(res => {
            console.log("New stamp attempted: ", res)
        })
    }

    // handleDelete = id => {
    //     fetch(`http://127.0.0.1:5000/stamp/${id}`, {
    //         method: "DELETE"
    //     }).then(
    //         console.log("Item was deleted")
    //     )
    // }


    render() {
        return (
            <div className="page-container">
                <div className="stamps">
                    <form>
                        {this.state.isLoading ? "Loading..." : null}
                        {this.state.stamps.map(stamp => {
                            return (
                                <div className="stamp-container">
                                    <div className="date">
                                        {/* {stamp.id} */}
                                        {/* <span><button onClick={this.handleDelete}>X</button></span> */}
                                        <span>{stamp.date}</span>
                                    </div>
                                    <div className="time">
                                        <span>{stamp.time}</span>
                                    </div>
                                    {/* <div>{this.state.time}</div> */}
                                </div>
                            )
                        })}
                        <div className="buttons">
                            <button className="clock-in" onClick={this.handleClockIn}>Clock In</button>
                            <button className="clock-out" onClick={this.handleClockOut}>Clock Out</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }


}