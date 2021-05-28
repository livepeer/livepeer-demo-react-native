import React, {useEffect, useRef} from 'react';
import {useRoute} from '@react-navigation/native';
import {Button, Div, Text} from 'react-native-magnus';
import {NodePlayerView} from 'react-native-nodemediaclient';
import {CloseButton} from '../components/CloseButton';
import {CopyInput} from '../components/CopyInput';

export interface Params {
  key: 'view_stream';
  name: 'view_stream';
  params: {playbackURL: string};
}

// https://github.com/NodeMedia/react-native-nodemediaclient/blob/master/NodePlayerModule.js
interface Player {
  pause(): void;
  start(): void;
  stop(): void;
}

export function ViewStream() {
  const playerRef = useRef<Player>(null);
  // useEffect(() => {
  //   return () => {
  //     console.log('STOP PLAYBACK', playerRef.current);
  //     playerRef.current?.stop();
  //   };
  // }, [playerRef]);
  const {params} = useRoute<Params>();
  return (
    <Div>
      <NodePlayerView
        style={{height: 480, width: '100%', backgroundColor: 'black'}}
        ref={playerRef}
        inputUrl={params.playbackURL}
        scaleMode={'ScaleAspectFit'}
        bufferTime={300}
        maxBufferTime={1000}
        autoplay={true}
      />

      <CloseButton
        color="white"
        onBeforeClose={() => {
          playerRef.current?.stop();
        }}
      />
      <Div p={20}>
        <CopyInput label="Playback URL" value={params.playbackURL} />
      </Div>
    </Div>
  );
}
