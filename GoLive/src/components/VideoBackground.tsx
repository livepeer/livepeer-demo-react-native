import React from 'react';
import Video from 'react-native-video';

export const VideoBackground: React.FC<{
  source: React.ComponentProps<typeof Video>['source'];
}> = ({source}) => (
  <Video
    source={source}
    rate={1.0}
    volume={1.0}
    muted={false}
    resizeMode={'cover'}
    repeat
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    }}
  />
);
