import React, { useEffect, useState } from "react";
import { Constants, MeetingProvider } from "@videosdk.live/react-sdk";
import { LeaveScreen } from "./components/screens/LeaveScreen";
import { JoiningScreen } from "./components/screens/JoiningScreen";
import { MeetingContainer } from "./meeting/MeetingContainer";
import { MeetingAppProvider } from "./MeetingAppContextDef";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";


const Signaling = () => {
  const [token, setToken] = useState("");
  const [meetingId, setMeetingId] = useState("");
  const [participantName, setParticipantName] = useState("");
  const [micOn, setMicOn] = useState(false);
  const [webcamOn, setWebcamOn] = useState(false);
  const [selectedMic, setSelectedMic] = useState({ id: null });
  const [selectedWebcam, setSelectedWebcam] = useState({ id: null });
  const [selectWebcamDeviceId, setSelectWebcamDeviceId] = useState(
    selectedWebcam.id
  );
  const [meetingMode, setMeetingMode] = useState(Constants.modes.CONFERENCE);
  const [selectMicDeviceId, setSelectMicDeviceId] = useState(selectedMic.id);
  const [isMeetingStarted, setMeetingStarted] = useState(false);
  const [isMeetingLeft, setIsMeetingLeft] = useState(false);

  const isMobile = window.matchMedia(
    "only screen and (max-width: 768px)"
  ).matches;
  const nav = useNavigate();
  const { state } = useLocation();
  const BASE_URL = 'https://ekseer-backend.alsahaba.sa/authentication-api';

  console.log(state)

  const updateAwaitingTime = async () => {
    var id = state.call_id;
    if (id != undefined) {
      var bodyFormData = new FormData();
      bodyFormData.append("awaiting_time", null);
      axios({
        method: "put",
        url: `${BASE_URL}/update-call/${id}/`,
        data: bodyFormData,
        headers: { "Content-Type": "application/json" },
      })
        .then(function (response) {
          var patientTime = response.data.patient_time;
          var doctorTime = response.data.doctor_time;
          var awaitingTime = doctorTime - patientTime;
          if (awaitingTime >= 0) {
            console.log(awaitingTime)
          }
          else {
            awaitingTime = "More than 15 minutes"
          }
          var bodyFormData = new FormData();
          bodyFormData.append("awaiting_time", awaitingTime);
          axios({
            method: "put",
            url: `${BASE_URL}/update-call/${id}/`,
            data: bodyFormData,
            headers: { "Content-Type": "application/json" },
          })

        })
        .catch(function (response) {
          console.log(response)
        });
    }
    else {
      console.log("patient");
    }
  }
  useEffect(() => {
    updateAwaitingTime();
    if (isMobile) {
      window.onbeforeunload = () => {
        return "Are you sure you want to exit?";
      };
    }
  }, [isMobile]);

  return (
    <>
      {isMeetingStarted ? (
        <MeetingAppProvider
          selectedMic={selectedMic}
          selectedWebcam={selectedWebcam}
          initialMicOn={micOn}
          initialWebcamOn={webcamOn}
        >
          <MeetingProvider
            config={{
              meetingId,
              micEnabled: micOn,
              webcamEnabled: webcamOn,
              name: state.loggedInUser.full_name,
              mode: meetingMode,
              multiStream: true,
            }}
            token={token}
            reinitialiseMeetingOnConfigChange={true}
            joinWithoutUserInteraction={true}
          >
            <MeetingContainer
              onMeetingLeave={() => {
                setToken("");
                setMeetingId("");
                setParticipantName("");
                setWebcamOn(false);
                setMicOn(false);
                setMeetingStarted(false);
              }}
              setIsMeetingLeft={setIsMeetingLeft}
              selectedMic={selectedMic}
              selectedWebcam={selectedWebcam}
              selectWebcamDeviceId={selectWebcamDeviceId}
              setSelectWebcamDeviceId={setSelectWebcamDeviceId}
              selectMicDeviceId={selectMicDeviceId}
              setSelectMicDeviceId={setSelectMicDeviceId}
              micEnabled={micOn}
              webcamEnabled={webcamOn}
            />
          </MeetingProvider>
        </MeetingAppProvider>
      ) : isMeetingLeft ? (
        <LeaveScreen setIsMeetingLeft={setIsMeetingLeft} call_id={state.call_id} />
      ) : (
        state.meeting_id == undefined ?
          <JoiningScreen
            participantName={participantName}
            setParticipantName={setParticipantName}
            setMeetingId={setMeetingId}
            setToken={setToken}
            setMicOn={setMicOn}
            micEnabled={micOn}
            webcamEnabled={webcamOn}
            setSelectedMic={setSelectedMic}
            setSelectedWebcam={setSelectedWebcam}
            setWebcamOn={setWebcamOn}
            onClickStartMeeting={() => {
              setMeetingStarted(true);
            }}
            startMeeting={isMeetingStarted}
            setIsMeetingLeft={setIsMeetingLeft}
            meetingMode={meetingMode}
            setMeetingMode={setMeetingMode}
          /> :
          <JoiningScreen
            participantName={participantName}
            setParticipantName={setParticipantName}
            setMeetingId={setMeetingId}
            callMeetingId={state.meeting_id}
            setToken={setToken}
            setMicOn={setMicOn}
            micEnabled={micOn}
            webcamEnabled={webcamOn}
            setSelectedMic={setSelectedMic}
            setSelectedWebcam={setSelectedWebcam}
            setWebcamOn={setWebcamOn}
            onClickStartMeeting={() => {
              setMeetingStarted(true);
            }}
            startMeeting={isMeetingStarted}
            setIsMeetingLeft={setIsMeetingLeft}
            meetingMode={meetingMode}
            setMeetingMode={setMeetingMode}
          />
      )}
    </>
  );
};

export default Signaling;