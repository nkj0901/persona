import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import VideoComponent from "../VideoComponent";
import RealTimeEmotion from "../RealTimeEmotion";
import { useDashboardContext } from "./DashboardContext";
import {Settings, SettingsModal, useSettingsContext} from "../Settings";
import RecordedExpressionsModal from "../Recording";
import Spinner from "../Spinner/Spinner";
import "./Dashboard.css";
import ScriptText from "../Script/ScriptText";
import { useLocation } from "react-router";
import axios from "axios";
import "../../index.css"
const Dashboard = (props) => {
  const { pathname } = useLocation();
  const [text,setText] = useState();
  const {loadedModels, setLoadedModels, recordedExpressionsVisible} = useDashboardContext();
  const {settingsVisible,webcamOff} = useSettingsContext();

  // Loads the essential models required for face detection, face landmarks detection
  // when the component is just mounted
  useEffect(() => {
    const name= pathname.substring(11);
    axios.get("http://localhost:8080/app/script?scriptId="+name,{
  
    }).then((response) =>{
        setText(response.data.value.content)
    }) 

    setLoadedModels(true);
    // loadEssentialModels()
    // .then(() => setLoadedModels(true));
  });

  return(
    // loadedModels? 
    <div className="dashboard min-h-screen min-w-full bg-bg-1 flex-1 w-full flex flex-col md:flex-row">
        <div className="textfield">
          {webcamOff? <></>:  <>
          <div>
              <ScriptText text={text}></ScriptText>
          </div>
          </>
        }
        </div>
        <div className="dashboard-left videocomponent flex-1 flex flex-col items-center justify-center mt-16 md:mt-0">
          <div className="flex flex-col w-fit relative">
            <VideoComponent text={text}/>
          </div>
        </div>

        <div className="emotiongraph">
          {webcamOff? <></>:  <>
                  <div className="dashboard-right flex-1 flex flex-col items-center justify-center my-16 md:my-0">
                  <div className="realtime-emotion flex flex-col items-center justify-center w-[400px] h-[300px] sm:w-[600px] sm:-h[400px] md:w-[700px] md:h-[450px] lg:w-[500px] lg:h-[400px]">
                    <RealTimeEmotion />
                  </div>
                </div>
                <AnimatePresence
                  // Disable any initial animations on children that
                  // are present when the component is first rendered
                  initial={false}
                  // Only render one component at a time.
                  // The exiting component will finish its exit
                  // animation before entering component is rendered
                  exitBeforeEnter={true}
                  // Fires when all exiting nodes have completed animating out
                  onExitComplete={() => null}
                >
                  {settingsVisible && <SettingsModal />}
                </AnimatePresence>
                <AnimatePresence
                  initial={false}
                  exitBeforeEnter={true}
                  onExitComplete={() => null}
                >
                  {window.innerWidth >= 870 && recordedExpressionsVisible && <RecordedExpressionsModal />}
                </AnimatePresence>
                </>
          }

        </div>
      </div>
    // : <span className="min-h-screen flex flex-col items-center justify-center bg-bg-1">
    //     <Spinner text={"Loading ML Models"} />
    //   </span>
  );
};

export default Dashboard;
