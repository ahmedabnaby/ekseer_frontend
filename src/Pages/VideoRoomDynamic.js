import React, { useEffect, useState } from 'react';
import AgoraUIKit from "agora-react-uikit";

import axios from "axios"

export const VideoRoom = () => {
    // const APP_ID = '8d8f353c5f6144318c366b8d9ffe4d2b';
    // const TOKEN =
    //   '007eJxTYCh56Od08OmJqTdljOZdYpV4+v6m2B/TI7dP3eSf3O0ewMGrwGCRYpFmbGqcbJpmZmhiYmxokWxsZpZkkWKZlpZqkmKUpJhyOaUhkJGBS+AtKyMDBIL4LAy+mVX5DAwAovcf0w==';
    // const CHANNEL = 'Mizo';
    const [videoCall, setVideoCall] = useState(true);
    const [token, setToken] = useState(null)
    // const agoraEngine = AgoraRTC.createClient({ mode: "rtc", codec: "vp9" });

    const options = {
        appId: "8d8f353c5f6144318c366b8d9ffe4d2b",
        channel: "Mizo",
        // tokenUrl: 'https://agora-token-server-wj8g.onrender.com/',
        // Set the user ID.
        uid: 0,
        // Set token expire time.
        ExpireTime: 60,
        // The base URL to your token server. For example, https://agora-token-service-production-92ff.up.railway.app".
        serverUrl: 'https://agora-token-server-wj8g.onrender.com',
        token: ""
        // token: "007eJxTYCh56Od08OmJqTdljOZdYpV4+v6m2B/TI7dP3eSf3O0ewMGrwGCRYpFmbGqcbJpmZmhiYmxokWxsZpZkkWKZlpZqkmKUpJhyOaUhkJGBS+AtKyMDBIL4LAy+mVX5DAwAovcf0w==",
    };
    const callbacks = {
        EndCall: () => setVideoCall(false),
    };
    // Fetches the <Vg k="VSDK" /> token
    const FetchToken = () => {
        axios.get(options.serverUrl + '/rtc/' + options.channel + '/1/uid/' + options.uid + '/?expiry=' + options.ExpireTime)
            .then(
                response => {
                    console.log("SUUCCESSSSSS" + response.data.rtcToken);
                    setToken(response.data.rtcToken);
                })
            .catch(error => {
                console.log("SUUCCESSSSSS" + error);

            });
    }
    console.log(token + "  AAAAAAAAAAAAAAAAAAAAAAAAAAAA ")
    options.token = token
    useEffect(() =>
        FetchToken(), [])

    return videoCall ? (
        <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
            <AgoraUIKit rtcProps={options} callbacks={callbacks} />
        </div>
    ) : (
        <h3 onClick={() => setVideoCall(true)}>Join</h3>
    );

}


















// import React, { useEffect, useState } from 'react';
// import AgoraRTC, { createClient } from 'agora-rtc-sdk-ng';
// import { VideoPlayer } from './VideoPlayer';

// const APP_ID = '8d8f353c5f6144318c366b8d9ffe4d2b';
// const TOKEN =
//   '007eJxTYCh56Od08OmJqTdljOZdYpV4+v6m2B/TI7dP3eSf3O0ewMGrwGCRYpFmbGqcbJpmZmhiYmxokWxsZpZkkWKZlpZqkmKUpJhyOaUhkJGBS+AtKyMDBIL4LAy+mVX5DAwAovcf0w==';
// const CHANNEL = 'Mizo';

// AgoraRTC.setLogLevel(4);

// let agoraCommandQueue = Promise.resolve();

// const createAgoraClient = ({
//   onVideoTrack,
//   onUserDisconnected,
// }) => {
//   const client = createClient({
//     mode: 'rtc',
//     codec: 'vp8',
//   });

//   let tracks;

//   const waitForConnectionState = (connectionState) => {
//     return new Promise((resolve) => {
//       const interval = setInterval(() => {
//         if (client.connectionState === connectionState) {
//           clearInterval(interval);
//           resolve();
//         }
//       }, 200);
//     });
//   };

//   const connect = async () => {
//     await waitForConnectionState('DISCONNECTED');

//     const uid = await client.join(
//       APP_ID,
//       CHANNEL,
//       TOKEN,
//       null
//     );

//     client.on('user-published', (user, mediaType) => {
//       client.subscribe(user, mediaType).then(() => {
//         if (mediaType === 'video') {
//           onVideoTrack(user);
//         }
//       });
//     });

//     client.on('user-left', (user) => {
//       onUserDisconnected(user);
//     });

//     tracks =
//       await AgoraRTC.createMicrophoneAndCameraTracks();

//     await client.publish(tracks);

//     return {
//       tracks,
//       uid,
//     };
//   };

//   const disconnect = async () => {
//     await waitForConnectionState('CONNECTED');
//     client.removeAllListeners();
//     for (let track of tracks) {
//       track.stop();
//       track.close();
//     }
//     await client.unpublish(tracks);
//     await client.leave();
//   };

//   return {
//     disconnect,
//     connect,
//   };
// };

// export const VideoRoom = () => {
//   const [users, setUsers] = useState([]);
//   const [uid, setUid] = useState(null);

//   useEffect(() => {
//     const onVideoTrack = (user) => {
//       setUsers((previousUsers) => [...previousUsers, user]);
//     };

//     const onUserDisconnected = (user) => {
//       setUsers((previousUsers) =>
//         previousUsers.filter((u) => u.uid !== user.uid)
//       );
//     };

//     const { connect, disconnect } = createAgoraClient({
//       onVideoTrack,
//       onUserDisconnected,
//     });

//     const setup = async () => {
//       const { tracks, uid } = await connect();
//       setUid(uid);
//       setUsers((previousUsers) => [
//         ...previousUsers,
//         {
//           uid,
//           audioTrack: tracks[0],
//           videoTrack: tracks[1],
//         },
//       ]);
//     };

//     const cleanup = async () => {
//       await disconnect();
//       setUid(null);
//       setUsers([]);
//     };

//     // setup();
//     agoraCommandQueue = agoraCommandQueue.then(setup);

//     return () => {
//       // cleanup();
//       agoraCommandQueue = agoraCommandQueue.then(cleanup);
//     };
//   }, []);

//   return (
//     <>
//       {uid}
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//         }}
//       >
//         <div
//           style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(2, 200px)',
//           }}
//         >
//           {users.map((user) => (
//             <VideoPlayer key={user.uid} user={user} />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };
