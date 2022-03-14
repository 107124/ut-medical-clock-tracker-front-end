// import * as React from "react";
import { Component } from "react"
import React from 'react';

export default class StampPage extends Component {

    state = {
        stamps: [],
        id: null,
        date: "",
        time: "",
        payDay: "",
        isPayDay: false,
        clocked_in: false,
        // status: [],
        isLoading: true,
    };

    updateState = (data) => {
        this.setState({
            stamps: data,
            id: data[0]["id"],
            date: data[0]["date"],
            time: data[0]["time"],
            payDay: data[0]["payDay"],
            clocked_in: data[0]["clocked_in"],
            // status: data[0]["clocked_in"],
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

    payPeriod = () => {

        var currentTime = new Date();
        // I'm setting the inital pay period (pay day)
        let period = this.state.payDay
        // getting the current day and formating it inside of "today"
        currentTime.setDate(currentTime.getDate())
        let today = currentTime.toLocaleDateString("en-US")
        // getting the current day + 14 days from that date and formating inside of "twoWeeks"
        currentTime.setDate(currentTime.getDate() + 14);
        let twoWeeks = currentTime.toLocaleDateString("en-US")

        // if today is payday (period), then set the new pay period to "twoWeeks" from now
        if (today === period) {
            period = twoWeeks;
            console.log(period)
            console.log(today)
            console.log(`Today is a pay period! A new pay period has been updated to ${period}`)
            return (`Clocked In: ${period}`)
        }
        else {
            console.log(period)
            console.log(today)
            return (`Clocked In: ${period}`)
        }


    }

    dateStamp = () => {
        let date = new Date();
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        return `${month}/${day}/${year}`;
    }

    calculateHours = () => {
        // var hours = Math.abs(date1 - date2) / 36e5;
        var hours = []
    }


    handleClockIn = (event) => {
        // if (this.state.clocked_in === false) {
        event.preventDefault();
        let timeStamp = Date.now()
        let convertTime = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timeStamp);
        // let object = JSON.parse(convertTime.split())
        const listIt = convertTime.split()
        const splitted = listIt[0].split(" ")
        var currentTime = new Date();
        currentTime.setDate(currentTime.getDate())
        let today = currentTime.toLocaleDateString("en-US")
        let date = today;
        const time = splitted[1].concat(` ${splitted[2]}`)
        alert(`You have been clocked in on ${this.dateStamp()} at ${time}`)
        // this.handleRefresh()
        // console.log(date, time)
        fetch('https://ut-medical-clockin-api.herokuapp.com/stamp', {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                date: `Clocked In: ${date}`,
                time: time,
                payDay: this.state.payDay,
                clocked_in: true
            })

        }).then(
            this.setState({
                date: `Clocked In: ${date}`,
                time: time,
                clocked_in: true
            })
        )
        // }
        // else {
        //     alert("You are already clocked in!")
        // }
    }

    handleClockOut = (event) => {
        // if (this.state.clocked_in === true) {
        event.preventDefault();
        let timeStamp = Date.now()
        let convertTime = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timeStamp);
        // let object = JSON.parse(convertTime.split())
        const listIt = convertTime.split()
        const splitted = listIt[0].split(" ")
        var currentTime = new Date();
        currentTime.setDate(currentTime.getDate())
        let today = currentTime.toLocaleDateString("en-US")
        let date = today;
        const time = splitted[1].concat(` ${splitted[2]}`)

        alert(`You have been clocked out on ${this.dateStamp()} at ${time}`)

        // console.log(date, time)
        fetch('https://ut-medical-clockin-api.herokuapp.com/stamp', {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                date: `Clocked Out: ${date}`,
                time: time,
                payDay: this.state.payDay,
                clocked_in: false

            })

        }).then(
            this.setState({
                date: `Clocked In: ${date}`,
                time: time,
                clocked_in: false
            })
        )

        // }
        // else {
        //     alert("You need to first clock in...")
        // }
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
                {/* <div className="status">
                    {this.state.status}
                </div> */}
                <div className="columns">
                    <h3>Date</h3>
                    <h3>Time</h3>
                </div>
                <div className="stamps">
                    <form>
                        {this.state.isLoading ? "Loading..." : null}
                        {this.state.stamps.map(stamp => {
                            return (
                                <div className="stamp-container">
                                    {/* {this.payPeriod()} */}
                                    <div className="date-container">
                                        <div>
                                            {/* if it's payday, display Pay Day */}
                                            {/* {stamp.date} */}
                                            {this.state.clocked_in}
                                            {/* {stamp.date === `Clocked In: ${this.payPeriod()}` ? <p>Pay Day</p> : null} */}
                                        </div>
                                        {this.state.isPayDay ? <h4>Pay Day</h4> : null}
                                        <div key={stamp.date}>{stamp.date.includes("Clocked In") ? <span className="inStyle">{stamp.date}</span> : <span className="outStyle">{stamp.date}</span>}</div>
                                    </div>
                                    <div className="time-container">
                                        <div key={stamp.time}>{stamp.time}</div>
                                    </div>
                                    {/* <div>{this.state.time}</div> */}
                                </div>
                            )
                        })}
                        <div className="buttons">
                        </div>
                    </form>
                    <button type="submit" className="clock-in" onClick={this.handleClockIn}>Clock In</button>
                    <button type="submit" className="clock-out" onClick={this.handleClockOut}>Clock Out</button>
                </div>
            </div>
        )
    }


}