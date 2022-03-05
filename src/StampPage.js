// import { render } from "@testing-library/react";
import * as React from "react";
import StampItem from "./StampItem"


const StampPage = () => {

  let [stamps, setStamps] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      let response = await fetch("http://127.0.0.1:5000/stamps").then(
        response => response.json()
      ).catch(error => {
        console.log("An error accured dude", error)
      })
      stamps = setStamps(response.results)
      console.log(response.results)
    }
    fetchData();
  }, []);

  const renderStamps = () => {
    return stamps?.map(stamp => {
      return <StampItem stamp={stamp} />
    })
  }

  return (
    <div className="stamps">
      <p>hello</p>
      <p>{renderStamps()}</p>

    </div>
  )

}

export default StampPage;