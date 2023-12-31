import { CheckIcon, ClipboardIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';


export function MeetingDetailsScreen({
  onClickJoin,
  _handleOnCreateMeeting,
  participantName,
  callMeetingId,
  setParticipantName,
  videoTrack,
  setVideoTrack,
  onClickStartMeeting,
}) {
  // const BASE_URL = 'https://ekseer-backend.alsahaba.sa/authentication-api';
  const BASE_URL = 'https://ekseer-backend.alsahaba.sa/authentication-api';

  const [meetingId, setMeetingId] = useState("");
  const [meetingIdError, setMeetingIdError] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [iscreateMeetingClicked, setIscreateMeetingClicked] = useState(false);
  const [isJoinMeetingClicked, setIsJoinMeetingClicked] = useState(false);

  const { state } = useLocation();
  const nav = useNavigate();


  participantName = state.loggedInUser.full_name
  // console.log(callMeetingId)
  const goBack = () => {
    window.history.go(-1);
  }
  return (
    <div
      className={`flex flex-1 flex-col justify-center w-full md:p-[6px] sm:p-1 p-1.5`}
    >
      {iscreateMeetingClicked ? (
        <div className="border border-solid border-gray-400 rounded-xl px-4 py-3  flex items-center justify-center d-none">
          <p className="text-white text-base">
            {`Meeting code : ${meetingId}`}
          </p>
          <button
            className="ml-2"
            onClick={() => {
              navigator.clipboard.writeText(meetingId);
              setIsCopied(true);
              setTimeout(() => {
                setIsCopied(false);
              }, 3000);
            }}
          >
            {isCopied ? (
              <CheckIcon className="h-5 w-5 text-green-400" />
            ) : (
              <ClipboardIcon className="h-5 w-5 text-white" />
            )}
          </button>
        </div>
      ) : isJoinMeetingClicked ? (
        <>
          {/* {console.log(callMeetingId)} */}
          <input
            defaultValue={callMeetingId}
            onChange={(e) => {
              setMeetingId(e.target.value);
            }}
            placeholder={"Enter meeting Id"}
            className="px-4 py-3 bg-gray-650 rounded-xl text-white w-full text-center d-none"
          />
          {meetingIdError && (
            <p className="text-xs text-red-600">{`Please enter valid meetingId`}</p>
          )}
        </>
      ) : null}

      {(iscreateMeetingClicked || isJoinMeetingClicked) && (
        <>
          <input
            value={state.loggedInUser.full_name}
            onChange={(e) => setParticipantName(e.target.value)}
            placeholder="Enter your name"
            className="px-4 py-3 mt-1 bg-gray-650 rounded-xl text-white w-full text-center"
          />

          {/* <p className="text-xs text-white mt-1 text-center">
            Your name will help everyone identify you in the meeting.
          </p> */}
          <button
            disabled={participantName.length < 3}
            className={`w-full ${participantName.length < 3 ? "bg-gray-650" : "bg-purple-350"
              }  text-white px-2 py-3 rounded-xl mt-3`}
            onClick={(e) => {
              if (iscreateMeetingClicked) {
                if (videoTrack) {
                  videoTrack.stop();
                  setVideoTrack(null);
                }
                onClickStartMeeting();
              } else {
                // console.log("YAAA MIIZOO" + meetingId)
                if (meetingId.match("\\w{4}\\-\\w{4}\\-\\w{4}")) {
                  onClickJoin(meetingId);
                } else setMeetingIdError(true);
              }
            }}
          >
            {iscreateMeetingClicked ? "Start a meeting" : "Join a meeting"}
          </button>
        </>
      )}

      {!iscreateMeetingClicked && !isJoinMeetingClicked && (
        <div className="w-full md:mt-0 mt-4 flex flex-col">
          <div className="flex items-center justify-center flex-col w-full ">
            {state.loggedInUser.is_doctor === false ?
              <>
                <button
                  className="w-full bg-purple-350 text-white px-2 py-3 rounded-xl"
                  onClick={async (e) => {
                    const meetingId = await _handleOnCreateMeeting();
                    setMeetingId(meetingId);
                    setIscreateMeetingClicked(true);
                    var bodyFormData = new FormData();
                    var patiend_id = state.loggedInUser.id
                    bodyFormData.append("meeting_id", meetingId);
                    bodyFormData.append("doctor_id", 0);
                    bodyFormData.append("is_new", true);
                    bodyFormData.append("patient_id", patiend_id);
                    axios({
                      method: "post",
                      url: `${BASE_URL}/create-call/`,
                      data: bodyFormData,
                      headers: { "Content-Type": "multipart/form-data" },
                    })
                      .then(function (response) {
                        var bodyFormData = new FormData();
                        bodyFormData.append("patient_time", new Date().getMinutes());
                        axios({
                          method: "put",
                          url: `${BASE_URL}/update-call/${response.data.id}/`,
                          data: bodyFormData,
                          headers: { "Content-Type": "application/json" },
                        })
                          .then(function (response) {
                            console.log(response)
                          })
                          .catch(function (response) {
                            console.log(response)
                          });
                        console.log(response);
                        nav("#", {
                          state: {
                            call_id: response.data.id,
                            logInToken: state.logInToken,
                            loggedInUser: state.loggedInUser
                          }
                        })
                      })
                      .catch(function (response) {
                        console.log(response);
                      });
                  }}
                >
                  Request a doctor
                </button>
                <button onClick={goBack} style={{ color: "#ba8abb", marginTop: '25px' }}>Go Back</button>

                {/* <a href="/login" style={{ color: "#ba8abb" }}>Go Back?</a> */}
              </>
              :
              ""
            }
            {state.loggedInUser.is_doctor ?

              <button
                className="w-full bg-gray-650 text-white px-2 py-3 rounded-xl"
                onClick={(e) => {
                  setMeetingId(callMeetingId)
                  setIsJoinMeetingClicked(true);
                }}
              >
                Join a meeting
              </button>
              :
              ""
            }
          </div>
        </div>
      )}
    </div>
  );
}