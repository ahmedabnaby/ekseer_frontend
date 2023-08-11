import React, { useEffect, useState } from 'react';
import AgoraRTC, { createClient } from 'agora-rtc-sdk-ng';
import { useLocation, useNavigate } from "react-router-dom";
import { VideoPlayer } from './VideoPlayer';

const APP_ID = '8d8f353c5f6144318c366b8d9ffe4d2b';
const TOKEN =
    '007eJxTYJB66sP51El0/kT+tBfesmI8y7bJHvbZernz3+Gr1jLswT0KDBYpFmnGpsbJpmlmhiYmxoYWycZmZkkWKZZpaakmKUZJi4KvpTQEMjL8mNjCxMgAgSA+C4NvZlU+AwMA1H0esQ==';
const CHANNEL = 'Mizo';
var id = null;

AgoraRTC.setLogLevel(4);

let agoraCommandQueue = Promise.resolve();

const createAgoraClient = ({
    onVideoTrack,
    onUserDisconnected,
}) => {
    const client = createClient({
        mode: 'rtc',
        codec: 'vp8',
    });

    let tracks;

    const waitForConnectionState = (connectionState) => {
        return new Promise((resolve) => {
            const interval = setInterval(() => {
                if (client.connectionState === connectionState) {
                    clearInterval(interval);
                    resolve();
                }
            }, 200);
        });
    };

    const connect = async () => {
        await waitForConnectionState('DISCONNECTED');

        const uid = await client.join(
            APP_ID,
            CHANNEL,
            TOKEN,
            id
        );

        client.on('user-published', (user, mediaType) => {
            client.subscribe(user, mediaType).then(() => {
                if (mediaType === 'video') {
                    onVideoTrack(user);
                }
            });
        });

        client.on('user-left', (user) => {
            onUserDisconnected(user);
        });

        tracks =
            await AgoraRTC.createMicrophoneAndCameraTracks();

        await client.publish(tracks);

        return {
            tracks,
            uid,
        };
    };

    const disconnect = async () => {
        await waitForConnectionState('CONNECTED');
        client.removeAllListeners();
        for (let track of tracks) {
            track.stop();
            track.close();
        }
        await client.unpublish(tracks);
        await client.leave();
    };

    return {
        disconnect,
        connect,
    };
};

export const VideoRoom = () => {
    const location = useLocation();
    var my_user = null
    if (location.state != null) {
        my_user = location.state.setCurrectUser;
        id = my_user.id
    }
    else {
        id = null
    }
    const [users, setUsers] = useState([]);
    const [uid, setUid] = useState(null);
    useEffect(() => {
        const onVideoTrack = (user) => {
            setUsers((previousUsers) => [...previousUsers, user]);
        };
        const onUserDisconnected = (user) => {
            setUsers((previousUsers) =>
                previousUsers.filter((u) => u.uid !== user.uid)
            );
        };

        const { connect, disconnect } = createAgoraClient({
            onVideoTrack,
            onUserDisconnected,
        });

        const setup = async () => {
            const { tracks, uid } = await connect();
            setUid(uid);
            setUsers((previousUsers) => [
                ...previousUsers,
                {
                    uid,
                    audioTrack: tracks[0],
                    videoTrack: tracks[1],
                },
            ]);
        };

        const cleanup = async () => {
            await disconnect();
            setUid(null);
            setUsers([]);
        };

        // setup();
        agoraCommandQueue = agoraCommandQueue.then(setup);

        return () => {
            // cleanup();
            agoraCommandQueue = agoraCommandQueue.then(cleanup);
        };
    }, []);

    return (
        <>
            {/* {uid} */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 200px)',
                    }}
                >
                    {users.map((user) => (
                        <VideoPlayer key={user.uid} user={user} />
                    ))}
                </div>
            </div>
            {location.state.setCurrectUser.is_doctor ?
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 col-md-6 col-lg-4 popup_box">
                            <h3 style={{ color: '#24ab94' }}>
                                Patient's
                                <span>records</span>
                            </h3>
                            <form action="#">
                                <div className="row">
                                    <div className="col-xl-12">
                                        <input type="text" placeholder="Full Name" required />
                                    </div>
                                    <div className="col-xl-6">
                                        <input type="number" placeholder="Mobile Number" required />
                                    </div>
                                    <div className="col-xl-6">
                                        <input type="email" placeholder="Email Address" required />
                                    </div>
                                    <div className="col-xl-12">
                                        <textarea placeholder="Consultation..." required></textarea>
                                    </div>
                                    <div className="col-xl-12">
                                        <button type="submit" className="boxed-btn mt-4" style={{ width: "100%" }}>Save</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                :
                ""
            }
        </>
    );
};

// import React, { useState } from 'react';
// import AgoraUIKit from 'agora-react-uikit';
// export const VideoRoom = () => {
//     const [videoCall, setVideoCall] = useState(true);
// const rtcProps = {
//         appId: '8d8f353c5f6144318c366b8d9ffe4d2b',
//         channel: 'Mizo',
//         token: '007eJxTYCh56Od08OmJqTdljOZdYpV4+v6m2B/TI7dP3eSf3O0ewMGrwGCRYpFmbGqcbJpmZmhiYmxokWxsZpZkkWKZlpZqkmKUpJhyOaUhkJGBS+AtKyMDBIL4LAy+mVX5DAwAovcf0w=='
//     };
// const callbacks = {
//         EndCall: () => setVideoCall(false),
//     };
// return videoCall ? (
//         <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
//             <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks}/>
//         </div>
//     ) : (
//         <h3 onClick={() => setVideoCall(true)}>Start Call</h3>
//     );
// };