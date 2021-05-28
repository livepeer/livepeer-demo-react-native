import {useMutation, useQuery} from 'react-query';
import {
  createStream,
  CreateStreamOptions,
  deleteStream,
  DeleteStreamOptions,
  fetchStreams,
  FetchStreamsOptions,
  fetchUser,
  FetchUserOptions,
} from '../api';
import {useAPIKeyStore} from './useAPIKeyStore';

export function useFetchUser(options: FetchUserOptions) {
  const key = useAPIKeyStore(state => state.key);
  return useQuery(['api-token', key, options] as const, () =>
    fetchUser(key, options),
  );
}

export function useFetchStreams(options: FetchStreamsOptions) {
  const key = useAPIKeyStore(state => state.key);
  return useQuery(['streams', key, options] as const, () =>
    fetchStreams(key, options),
  );
}

export function useCreateStream() {
  const key = useAPIKeyStore(state => state.key);
  return useMutation((options: CreateStreamOptions) =>
    createStream(key, options),
  );
}

export function useDeleteStream() {
  const key = useAPIKeyStore(state => state.key);
  return useMutation((options: DeleteStreamOptions) =>
    deleteStream(key, options),
  );
}
