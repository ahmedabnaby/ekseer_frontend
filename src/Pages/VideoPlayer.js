import React, {
    useEffect,
    useLayoutEffect,
    useRef,
  } from 'react';
  
  export const VideoPlayer = ({ user }) => {
    const ref = useRef();
  
    useEffect(() => {
      user.videoTrack.play(ref.current);
    }, []);
  
    return (
      <div>
        {/* Uid: {user.uid} */}
        <div
          ref={ref}
          style={{ width: '25vh', height: '40vh', marginTop:'66px' }}
        ></div>
      </div>
    );
  };
  