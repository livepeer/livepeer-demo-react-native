import React, {useCallback, useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Button,
  Div,
  Dropdown,
  DropdownRef,
  Icon,
  Snackbar,
  Text,
} from 'react-native-magnus';
import BroadcastCameraView, {
  CameraView,
} from '../components/BroadcastCameraView';
import {CloseButton} from '../components/CloseButton';
import {useAPIKeyStore} from '../hooks/useAPIKeyStore';
import {useCreateStream, useDeleteStream} from '../hooks/useAPI';
import {CopyInput} from '../components/CopyInput';

export function BroadcastStream() {
  const navigation = useNavigation();
  const errorSnackbarRef = useRef<Snackbar>(null);
  const dropdownRef = useRef<DropdownRef>(null);
  const cameraViewRef = useRef<CameraView>(null);
  useEffect(() => {
    return () => {
      // Stop the stream when leaving the view
      cameraViewRef.current?.stop();
    };
  }, [cameraViewRef]);
  const isAuthenticated = useAPIKeyStore(state => !!state.key);
  useEffect(() => {
    if (!isAuthenticated) {
      navigation.navigate('enter_api_key');
    }
  }, [isAuthenticated, navigation]);
  const deleteStream = useDeleteStream();
  const createStream = useCreateStream();
  const isDeletingStream = deleteStream.isLoading;
  const isCreatingStream = createStream.isLoading;
  const error = (deleteStream.error ?? createStream.error) as Error | undefined;
  const streamKey = createStream.data?.streamKey;
  useEffect(() => {
    if (!error) return;
    errorSnackbarRef.current?.show(error.message, {
      duration: 8000,
      suffix: <Icon name="exclamationcircleo" color="white" fontSize="md" />,
    });
  }, [error, errorSnackbarRef]);
  useEffect(() => {
    if (streamKey) {
      console.log('START STREAM', streamKey, cameraViewRef.current?.start);
      cameraViewRef.current?.start();
    } else {
      console.log('STOP STREAM');
      cameraViewRef.current?.stop();
    }
  }, [streamKey, cameraViewRef]);
  const onStartStreaming = useCallback(() => {
    createStream.mutate({
      name: `GoLiveTestStream_${Date.now()}`,
      profiles: [
        {fps: 0, name: '240p0', width: 240, height: 426, bitrate: 250000},
        {fps: 0, name: '360p0', width: 360, height: 640, bitrate: 800000},
        {fps: 0, name: '480p0', width: 480, height: 854, bitrate: 1600000},
        {fps: 0, name: '720p0', width: 720, height: 1280, bitrate: 3000000},
      ],
    });
  }, [createStream]);
  const onStopStreaming = useCallback(() => {
    const id = createStream.data?.id;
    if (id) deleteStream.mutate({id});
    createStream.reset();
  }, [createStream]);
  const onOpenDropdown = useCallback(() => {
    dropdownRef.current?.open();
  }, [dropdownRef]);
  return (
    <>
      <Div style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <BroadcastCameraView
          ref={cameraViewRef}
          ingestURL={`rtmp://rtmp.livepeer.com/live/${streamKey}`}
        />

        <CloseButton color="white" onBeforeClose={onStopStreaming} />

        <Div
          m={0}
          p={40}
          h="auto"
          w="100%"
          position="absolute"
          bottom={0}
          row
          justifyContent="space-between">
          <Button bg="transparent" p={0} m={0} onPress={onOpenDropdown}>
            <Icon
              mt={10}
              shadow="heavy"
              shadowColor="black"
              name="ellipsis1"
              color="white"
              fontSize={32}
              style={{transform: [{rotate: '90deg'}]}}
            />
          </Button>
          <Button
            disabled={isCreatingStream || isDeletingStream}
            p={16}
            rounded="circle"
            letterSpacing={0.5}
            fontWeight="600"
            fontSize="normal"
            bg={streamKey ? 'red' : '#943CFF'}
            color="white"
            onPress={streamKey ? onStopStreaming : onStartStreaming}>
            {streamKey
              ? 'End Stream'
              : isCreatingStream
              ? 'Going Live...'
              : 'Go Live'}
          </Button>
        </Div>
      </Div>
      <Snackbar ref={errorSnackbarRef} bg="red" color="white" />
      <Dropdown
        ref={dropdownRef}
        title={
          <Div row alignItems="center">
            <Text
              color="#943CFF"
              textAlign="center"
              flex={1}
              fontSize={27}
              fontWeight="bold">
              Stream Info
            </Text>
          </Div>
        }
        w="100%"
        mt="md"
        pb="2xl"
        showSwipeIndicator={true}
        roundedTop="xl">
        {createStream.data ? (
          <Div mx="xl" p="md" pb="lg" alignItems="center">
            <Div w="100%" pb="2xl">
              <CopyInput label="Stream ID" value={createStream.data.id} />
              <CopyInput
                label="Stream Key"
                value={createStream.data.streamKey}
              />
              <CopyInput
                label="RTMP Ingest URL"
                value="rtmp://rtmp.livepeer.com/live"
              />
              <CopyInput
                label="Playback URL"
                value={`https://cdn.livepeer.com/hls/${createStream.data.playbackId}/index.m3u8`}
              />
            </Div>
          </Div>
        ) : (
          <Div mx="xl" alignItems="center" p="md" pb="lg">
            <Text>Once you go live, your stream info will show up here :)</Text>
          </Div>
        )}
      </Dropdown>
    </>
  );
}
