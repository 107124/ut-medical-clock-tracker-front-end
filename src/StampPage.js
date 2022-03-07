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
        console.log("Should be updated")
    }

    async componentDidMount() {
        const url = "http://127.0.0.1:5000/stamps";
        const response = await fetch(url);
        const data = await response.json()
        this.updateState(data);
        console.log(data)
    }

    // content = this.state.isLoading ? "Loading..." :
    //     this.state.stamps.map(stamp => {
    //         return (
    //             <div>
    //                 <div>{stamp.date}</div>
    //                 <div>{stamp.time}</div>
    //             </div>
    //         )
    //     })


    render() {
        return (
            <div className="page-CredentialsContainer">
                <div className="test">
                    {this.state.isLoading ? "Loading..." : null}
                    {this.state.stamps.map(stamp => {
                        return (
                            <div>
                                <div>{stamp.date}</div>
                                <div>{stamp.time}</div>
                            </div>
                        )
                    })}
                    {/* {this.content} */}

                </div>
            </div>
        )
    }


}