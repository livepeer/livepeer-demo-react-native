import React, {forwardRef} from 'react';
import {NodeCameraView} from 'react-native-nodemediaclient';

interface Props {
  ingestURL: string;
}

// https://github.com/NodeMedia/react-native-nodemediaclient/blob/master/NodeCameraModule.js
export interface CameraView {
  switchCamera(): void;
  flashEnable(): void;
  startPreview(): void;
  stopPreview(): void;
  start(): void;
  stop(): void;
}

const BroadcastCameraView = forwardRef<CameraView, Props>((props, ref) => {
  return (
    <NodeCameraView
      style={{flex: 1, width: '100%', height: '100%', backgroundColor: 'gray'}}
      ref={ref}
      outputUrl={props.ingestURL}
      camera={{cameraId: 1, cameraFrontMirror: true}}
      audio={{bitrate: 32000, profile: 1, samplerate: 44100}}
      video={{
        preset: 12,
        bitrate: 400000,
        profile: 1,
        fps: 15,
        videoFrontMirror: false,
      }}
      autopreview={true}
    />
  );
});

export default BroadcastCameraView;
