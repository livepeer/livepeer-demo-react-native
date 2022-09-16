export interface APIToken {
  kind: 'api-token';
  id: string;
  name: string;
  userId: string;
  lastSeen: number;
  createdAt: number;
}

export interface User {
  kind: 'user';
  id: string;
  salt: null;
  admin: boolean;
  email: string;
  lastName: string;
  lastSeen: number;
  password: null;
  createdAt: number;
  firstName: string;
  emailValid: boolean;
  lastStreamedAt: number;
  emailValidToken: null;
  stripeProductId: string;
  stripeCustomerId: string;
  stripeCustomerSubscriptionId: string;
}

export interface Stream {
  kind: 'stream';
  lastSeen: number | null;
  isActive: boolean;
  record: boolean;
  suspended: boolean;
  sourceSegments: number;
  transcodedSegments: number;
  sourceSegmentsDuration: number;
  transcodedSegmentsDuration: number;
  sourceBytes: number;
  transcodedBytes: number;
  id: string;
  name: string;
  region: string;
  userId: string;
  profiles: {
    fps: number; // min: 0
    name: string; // min: 1, max: 500
    width: number; // width: 128
    height: number; // min: 128
    bitrate: number; // min: 400
  }[];
  createdAt: number;
  streamKey: string;
  ingestRate: number;
  playbackId: string;
  renditions: object; // ???
  outgoingRate: number;
}

export interface FetchUserOptions {
  id: string;
}
export const fetchUser = async (apiKey: string, options: FetchUserOptions) => {
  const res = await fetch(`https://livepeer.studio/api/user/${options.id}`, {
    method: 'GET',
    headers: {Authorization: `Bearer ${apiKey}`},
  });
  if (!res.ok) throw new Error(res.status + ' Could not fetch user');
  return (await res.json()) as APIToken;
};

export interface FetchStreamsOptions {
  only?: 'streams' | 'sessions';
  record?: boolean;
  isActive?: boolean;
}
export const fetchStreams = async (
  apiKey: string,
  options: FetchStreamsOptions,
) => {
  let params = [];
  if (options.only === 'streams') {
    params.push('streamsonly=1');
  }
  if (options.only === 'sessions') {
    params.push('sessionsonly=1');
  }
  if (options.record) {
    params.push('record=1');
  }
  if (options.isActive) {
    params.push(encodeURIComponent('filters=[{id:"isActive",value:true}]'));
  }
  let query = params.join('&');
  if (query.length) query = '?' + query;
  const res = await fetch(`https://livepeer.studio/api/stream/${query}`, {
    method: 'GET',
    headers: {Authorization: `Bearer ${apiKey}`},
  });
  if (!res.ok) throw new Error(res.status + ' Could not fetch streams');
  return (await res.json()) as Stream[];
};

export type CreateStreamOptions = {
  name: string;
} & Partial<{
  record: boolean;
  profiles: Stream['profiles'];
}>;
export const createStream = async (
  apiKey: string,
  options: CreateStreamOptions,
) => {
  const res = await fetch(`https://livepeer.studio/api/stream/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options),
  });
  if (!res.ok) throw new Error(res.status + ' Could not create stream');
  return (await res.json()) as Stream;
};

export interface DeleteStreamOptions {
  id: string;
}
export const deleteStream = async (
  apiKey: string,
  options: DeleteStreamOptions,
) => {
  const res = await fetch(`https://livepeer.studio/api/stream/${options.id}`, {
    method: 'DELETE',
    headers: {Authorization: `Bearer ${apiKey}`},
    body: JSON.stringify(options),
  });
  if (!res.ok) throw new Error(res.status + ' Could not delete stream');
};
