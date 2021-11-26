import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./style.css"
import image from '../../assets/video/Dashboard.png'
import { Accordion, Card } from 'react-bootstrap'

const RadioResults = ({ fmCountry, fmCountryRadioStations, fmRadioStationGenre, toggleDisplay,
    setCountryRadioStations,
    setRadioStationGenre,
    setRadioStations }) => {

    const [selectRadio, setSelectRadio] = useState("")
    const testFunction = () => {
        console.log("testtestest");
    }

    const clearAll = () => {
        toggleDisplay();
        setRadioStations([]);
        setCountryRadioStations("");
        setRadioStations("");
    };

    return (

        <>
            <div className="radio-player">
                <div>

                    <h4>Enjoy your station</h4>

                    <button onClick={toggleDisplay}>Return</button>

                </div>
            </div>
            <div>
                <audio
                    /* src={"https://radio-stream-1.obozrevatel.com/radioec128.mp3"} */
                    src={selectRadio}
                    controls
                    autoplay
                    type="audio/m3u"
                >
                    radio
                </audio>
            </div>

            <div className="">
                <img className="driver-img" src={image} alt=""
                    style={{
                        position: "absolute",
                        width: "100%",
                        left: "50%",
                        top: "70vh",
                        height: "70vh",
                        transform: "translate(-50%, -50%)",
                    }} />
                <Accordion defaultActiveKey="0" flush>
                    <Accordion.Item eventKey="1">


                        <Accordion.Body as={Card.Body}>

                            <div className="div">{fmCountry.map((item) => (<button onClick={() => (setSelectRadio(item.source))}>{item.title}</button>))}</div>
                        </Accordion.Body>
                        <Accordion.Button centered><h4>{fmCountryRadioStations}<hr />{fmRadioStationGenre}</h4></Accordion.Button>


                    </Accordion.Item>
                </Accordion>

            </div>

        </>
    )
}

export default RadioResults
