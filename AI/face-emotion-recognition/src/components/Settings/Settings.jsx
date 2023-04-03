import { useDashboardContext } from '../Dashboard';
import { useSettingsContext } from './SettingsContext';
import './Settings.css';
import { Button, Toggle } from '../AnimatedComponents';
import { SettingsIcon } from '../Icons';
import { useReactMediaRecorder } from 'react-media-recorder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRecordVinyl } from '@fortawesome/free-solid-svg-icons';

const Settings = (props) => {
  const { webcamOn, setWebcamOn, setWebcamOff, setSettingsVisible } = useSettingsContext();
  const { setRecordedExpressionsVisible, setMountedVideoComponent } = useDashboardContext();
  const { stopRecording } = useReactMediaRecorder({ video: true });

  function setvideo() {
    return stopRecording;
  }
  return (
    <div className="flex flex-row justify-between mx-4 my-6 px-4 py-2 bg-bg-2 rounded-lg shadow-2xl border-2 border-fg-1">
      <div className="flex flex-row">
        <span className="flex flex-col items-center justify-center">
          <Button initialState={webcamOn} onClick={() => setWebcamOn(true)}>
            <FontAwesomeIcon icon={faRecordVinyl} style={{ width: '30px', height: '30px' }} />
          </Button>
        </span>
      </div>
      <Button onClick={() => setSettingsVisible(true)} rotateAnimation={true}>
        <SettingsIcon />
      </Button>
      {webcamOn?
      <Button
        className="endrecord"
        variant="contained" 
        onClick={props.endrecord}
        color="error"
        >녹화종료
      </Button>
      :<></>}

    </div>
  );
};

export default Settings;
