import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";

import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";

import { drawRect } from "../../components/app/Drawing";
import Waste from "../../assets/json/waste.json";

function ReciklazAI() {
  const [seconds, setSeconds] = useState(new Date().getSeconds());

  function GetTime() {
    setSeconds(new Date().getSeconds());
    // console.count(seconds);
  }

  setTimeout(() => {
    // console.log("Footer Rendered");
    GetTime();
  }, 1000);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [device, setDevice] = useState(true);
  const trash = new Set();
  const [garbage, setGarbage] = useState(new Set());
  // Main function
  const runCoco = async () => {
    const net = await cocossd.load();

    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // 4. TODO - Make Detections
      const obj = await net.detect(video);

      // console.log(obj);

      obj.map((element) => {
        Waste.map((waste) => {
          if (element.class === waste.Name.toLowerCase()) {
            // trash.add(waste);
            setGarbage((prev) => prev.add(waste));
          }
        });
      });
      // console.log(trash);
      // console.log(garbage);

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");

      drawRect(obj, ctx);
    }
  };

  useEffect(() => {
    runCoco();
    window.innerWidth > 500 ? setDevice(true) : setDevice(false);
  }, []);

  return (
    <>
      <div className="reciklazai">
        <div className="reciklazai__header">
          <Webcam
            className="reciklazai__canvas"
            ref={webcamRef}
            muted={true}
            style={{
              // position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "center",
              zindex: 9,
            }}
            videoConstraints={{
              facingMode: device ? "user" : { exact: "environment" },
              // facingMode: "user",
            }}
          />

          <canvas
            className="reciklazai__canvas reciklazai__canvas--2"
            ref={canvasRef}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zindex: 8,
            }}
          />
          <span className="sofia" style={{ marginTop: 5, textAlign: "center" }}>
            Skenirajte neki predmet kako bi ste videli informacije o procesu
            reciklaže <span className="beta">BETA</span>
          </span>
        </div>

        <div className="reciklazai__proces">
          {[...garbage].map(({ Ime, Name, Materials, Process, Category }) => (
            <div key={Name} className="sofia aitem">
              <h1 className="aitem__name fw-700">{Ime}</h1>
              <h2 className="aitem__materials">{Materials + " "}</h2>
              <p className="aitem__process">{Process}</p>
              <h3 className="aitem__category">{Category}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ReciklazAI;
