/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "proto";

export enum ElementMessageType {
  UNKNOWN = 0,
  ERROR = 1,
  CHAT_MESSAGE = 2,
  PLAY = 3,
  PAUSE = 4,
  CHECK = 5,
  TOO_FAST = 6,
  TOO_SLOW = 7,
  CHANGE_RATE = 8,
  CHANGE_SEEK = 9,
  CURRENT_CHANGED = 10,
  MOVIES_CHANGED = 11,
  PEOPLE_CHANGED = 12,
  SYNC_MOVIE_STATUS = 13,
  CURRENT_EXPIRED = 14,
  UNRECOGNIZED = -1,
}

export function elementMessageTypeFromJSON(object: any): ElementMessageType {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return ElementMessageType.UNKNOWN;
    case 1:
    case "ERROR":
      return ElementMessageType.ERROR;
    case 2:
    case "CHAT_MESSAGE":
      return ElementMessageType.CHAT_MESSAGE;
    case 3:
    case "PLAY":
      return ElementMessageType.PLAY;
    case 4:
    case "PAUSE":
      return ElementMessageType.PAUSE;
    case 5:
    case "CHECK":
      return ElementMessageType.CHECK;
    case 6:
    case "TOO_FAST":
      return ElementMessageType.TOO_FAST;
    case 7:
    case "TOO_SLOW":
      return ElementMessageType.TOO_SLOW;
    case 8:
    case "CHANGE_RATE":
      return ElementMessageType.CHANGE_RATE;
    case 9:
    case "CHANGE_SEEK":
      return ElementMessageType.CHANGE_SEEK;
    case 10:
    case "CURRENT_CHANGED":
      return ElementMessageType.CURRENT_CHANGED;
    case 11:
    case "MOVIES_CHANGED":
      return ElementMessageType.MOVIES_CHANGED;
    case 12:
    case "PEOPLE_CHANGED":
      return ElementMessageType.PEOPLE_CHANGED;
    case 13:
    case "SYNC_MOVIE_STATUS":
      return ElementMessageType.SYNC_MOVIE_STATUS;
    case 14:
    case "CURRENT_EXPIRED":
      return ElementMessageType.CURRENT_EXPIRED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ElementMessageType.UNRECOGNIZED;
  }
}

export function elementMessageTypeToJSON(object: ElementMessageType): string {
  switch (object) {
    case ElementMessageType.UNKNOWN:
      return "UNKNOWN";
    case ElementMessageType.ERROR:
      return "ERROR";
    case ElementMessageType.CHAT_MESSAGE:
      return "CHAT_MESSAGE";
    case ElementMessageType.PLAY:
      return "PLAY";
    case ElementMessageType.PAUSE:
      return "PAUSE";
    case ElementMessageType.CHECK:
      return "CHECK";
    case ElementMessageType.TOO_FAST:
      return "TOO_FAST";
    case ElementMessageType.TOO_SLOW:
      return "TOO_SLOW";
    case ElementMessageType.CHANGE_RATE:
      return "CHANGE_RATE";
    case ElementMessageType.CHANGE_SEEK:
      return "CHANGE_SEEK";
    case ElementMessageType.CURRENT_CHANGED:
      return "CURRENT_CHANGED";
    case ElementMessageType.MOVIES_CHANGED:
      return "MOVIES_CHANGED";
    case ElementMessageType.PEOPLE_CHANGED:
      return "PEOPLE_CHANGED";
    case ElementMessageType.SYNC_MOVIE_STATUS:
      return "SYNC_MOVIE_STATUS";
    case ElementMessageType.CURRENT_EXPIRED:
      return "CURRENT_EXPIRED";
    case ElementMessageType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface ChatResp {
  sender: Sender | undefined;
  message: string;
}

export interface Sender {
  username: string;
  userid: string;
}

export interface MovieStatus {
  playing: boolean;
  seek: number;
  rate: number;
}

export interface MovieStatusChanged {
  sender: Sender | undefined;
  status: MovieStatus | undefined;
}

export interface CheckReq {
  status: MovieStatus | undefined;
  expireId: number;
}

export interface ElementMessage {
  type: ElementMessageType;
  time: number;
  error: string;
  chatReq: string;
  chatResp: ChatResp | undefined;
  changeMovieStatusReq: MovieStatus | undefined;
  movieStatusChanged: MovieStatusChanged | undefined;
  changeSeekReq: number;
  checkReq: CheckReq | undefined;
  peopleChanged: number;
  moviesChanged: Sender | undefined;
  currentChanged: Sender | undefined;
}

function createBaseChatResp(): ChatResp {
  return { sender: undefined, message: "" };
}

export const ChatResp = {
  encode(message: ChatResp, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== undefined) {
      Sender.encode(message.sender, writer.uint32(10).fork()).ldelim();
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChatResp {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChatResp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sender = Sender.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ChatResp {
    return {
      sender: isSet(object.sender) ? Sender.fromJSON(object.sender) : undefined,
      message: isSet(object.message) ? globalThis.String(object.message) : "",
    };
  },

  toJSON(message: ChatResp): unknown {
    const obj: any = {};
    if (message.sender !== undefined) {
      obj.sender = Sender.toJSON(message.sender);
    }
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ChatResp>, I>>(base?: I): ChatResp {
    return ChatResp.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ChatResp>, I>>(object: I): ChatResp {
    const message = createBaseChatResp();
    message.sender = (object.sender !== undefined && object.sender !== null)
      ? Sender.fromPartial(object.sender)
      : undefined;
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseSender(): Sender {
  return { username: "", userid: "" };
}

export const Sender = {
  encode(message: Sender, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.username !== "") {
      writer.uint32(10).string(message.username);
    }
    if (message.userid !== "") {
      writer.uint32(18).string(message.userid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Sender {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSender();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.username = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.userid = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Sender {
    return {
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      userid: isSet(object.userid) ? globalThis.String(object.userid) : "",
    };
  },

  toJSON(message: Sender): unknown {
    const obj: any = {};
    if (message.username !== "") {
      obj.username = message.username;
    }
    if (message.userid !== "") {
      obj.userid = message.userid;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Sender>, I>>(base?: I): Sender {
    return Sender.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Sender>, I>>(object: I): Sender {
    const message = createBaseSender();
    message.username = object.username ?? "";
    message.userid = object.userid ?? "";
    return message;
  },
};

function createBaseMovieStatus(): MovieStatus {
  return { playing: false, seek: 0, rate: 0 };
}

export const MovieStatus = {
  encode(message: MovieStatus, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.playing === true) {
      writer.uint32(8).bool(message.playing);
    }
    if (message.seek !== 0) {
      writer.uint32(17).double(message.seek);
    }
    if (message.rate !== 0) {
      writer.uint32(25).double(message.rate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MovieStatus {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMovieStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.playing = reader.bool();
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }

          message.seek = reader.double();
          continue;
        case 3:
          if (tag !== 25) {
            break;
          }

          message.rate = reader.double();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MovieStatus {
    return {
      playing: isSet(object.playing) ? globalThis.Boolean(object.playing) : false,
      seek: isSet(object.seek) ? globalThis.Number(object.seek) : 0,
      rate: isSet(object.rate) ? globalThis.Number(object.rate) : 0,
    };
  },

  toJSON(message: MovieStatus): unknown {
    const obj: any = {};
    if (message.playing === true) {
      obj.playing = message.playing;
    }
    if (message.seek !== 0) {
      obj.seek = message.seek;
    }
    if (message.rate !== 0) {
      obj.rate = message.rate;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MovieStatus>, I>>(base?: I): MovieStatus {
    return MovieStatus.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MovieStatus>, I>>(object: I): MovieStatus {
    const message = createBaseMovieStatus();
    message.playing = object.playing ?? false;
    message.seek = object.seek ?? 0;
    message.rate = object.rate ?? 0;
    return message;
  },
};

function createBaseMovieStatusChanged(): MovieStatusChanged {
  return { sender: undefined, status: undefined };
}

export const MovieStatusChanged = {
  encode(message: MovieStatusChanged, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.sender !== undefined) {
      Sender.encode(message.sender, writer.uint32(10).fork()).ldelim();
    }
    if (message.status !== undefined) {
      MovieStatus.encode(message.status, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MovieStatusChanged {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMovieStatusChanged();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.sender = Sender.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.status = MovieStatus.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MovieStatusChanged {
    return {
      sender: isSet(object.sender) ? Sender.fromJSON(object.sender) : undefined,
      status: isSet(object.status) ? MovieStatus.fromJSON(object.status) : undefined,
    };
  },

  toJSON(message: MovieStatusChanged): unknown {
    const obj: any = {};
    if (message.sender !== undefined) {
      obj.sender = Sender.toJSON(message.sender);
    }
    if (message.status !== undefined) {
      obj.status = MovieStatus.toJSON(message.status);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MovieStatusChanged>, I>>(base?: I): MovieStatusChanged {
    return MovieStatusChanged.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MovieStatusChanged>, I>>(object: I): MovieStatusChanged {
    const message = createBaseMovieStatusChanged();
    message.sender = (object.sender !== undefined && object.sender !== null)
      ? Sender.fromPartial(object.sender)
      : undefined;
    message.status = (object.status !== undefined && object.status !== null)
      ? MovieStatus.fromPartial(object.status)
      : undefined;
    return message;
  },
};

function createBaseCheckReq(): CheckReq {
  return { status: undefined, expireId: 0 };
}

export const CheckReq = {
  encode(message: CheckReq, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.status !== undefined) {
      MovieStatus.encode(message.status, writer.uint32(10).fork()).ldelim();
    }
    if (message.expireId !== 0) {
      writer.uint32(16).uint64(message.expireId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CheckReq {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCheckReq();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.status = MovieStatus.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.expireId = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CheckReq {
    return {
      status: isSet(object.status) ? MovieStatus.fromJSON(object.status) : undefined,
      expireId: isSet(object.expireId) ? globalThis.Number(object.expireId) : 0,
    };
  },

  toJSON(message: CheckReq): unknown {
    const obj: any = {};
    if (message.status !== undefined) {
      obj.status = MovieStatus.toJSON(message.status);
    }
    if (message.expireId !== 0) {
      obj.expireId = Math.round(message.expireId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CheckReq>, I>>(base?: I): CheckReq {
    return CheckReq.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CheckReq>, I>>(object: I): CheckReq {
    const message = createBaseCheckReq();
    message.status = (object.status !== undefined && object.status !== null)
      ? MovieStatus.fromPartial(object.status)
      : undefined;
    message.expireId = object.expireId ?? 0;
    return message;
  },
};

function createBaseElementMessage(): ElementMessage {
  return {
    type: 0,
    time: 0,
    error: "",
    chatReq: "",
    chatResp: undefined,
    changeMovieStatusReq: undefined,
    movieStatusChanged: undefined,
    changeSeekReq: 0,
    checkReq: undefined,
    peopleChanged: 0,
    moviesChanged: undefined,
    currentChanged: undefined,
  };
}

export const ElementMessage = {
  encode(message: ElementMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.time !== 0) {
      writer.uint32(16).int64(message.time);
    }
    if (message.error !== "") {
      writer.uint32(26).string(message.error);
    }
    if (message.chatReq !== "") {
      writer.uint32(34).string(message.chatReq);
    }
    if (message.chatResp !== undefined) {
      ChatResp.encode(message.chatResp, writer.uint32(42).fork()).ldelim();
    }
    if (message.changeMovieStatusReq !== undefined) {
      MovieStatus.encode(message.changeMovieStatusReq, writer.uint32(50).fork()).ldelim();
    }
    if (message.movieStatusChanged !== undefined) {
      MovieStatusChanged.encode(message.movieStatusChanged, writer.uint32(58).fork()).ldelim();
    }
    if (message.changeSeekReq !== 0) {
      writer.uint32(65).double(message.changeSeekReq);
    }
    if (message.checkReq !== undefined) {
      CheckReq.encode(message.checkReq, writer.uint32(74).fork()).ldelim();
    }
    if (message.peopleChanged !== 0) {
      writer.uint32(88).int64(message.peopleChanged);
    }
    if (message.moviesChanged !== undefined) {
      Sender.encode(message.moviesChanged, writer.uint32(98).fork()).ldelim();
    }
    if (message.currentChanged !== undefined) {
      Sender.encode(message.currentChanged, writer.uint32(106).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ElementMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseElementMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.time = longToNumber(reader.int64() as Long);
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.error = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.chatReq = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.chatResp = ChatResp.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.changeMovieStatusReq = MovieStatus.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.movieStatusChanged = MovieStatusChanged.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 65) {
            break;
          }

          message.changeSeekReq = reader.double();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.checkReq = CheckReq.decode(reader, reader.uint32());
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.peopleChanged = longToNumber(reader.int64() as Long);
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.moviesChanged = Sender.decode(reader, reader.uint32());
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.currentChanged = Sender.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ElementMessage {
    return {
      type: isSet(object.type) ? elementMessageTypeFromJSON(object.type) : 0,
      time: isSet(object.time) ? globalThis.Number(object.time) : 0,
      error: isSet(object.error) ? globalThis.String(object.error) : "",
      chatReq: isSet(object.chatReq) ? globalThis.String(object.chatReq) : "",
      chatResp: isSet(object.chatResp) ? ChatResp.fromJSON(object.chatResp) : undefined,
      changeMovieStatusReq: isSet(object.changeMovieStatusReq)
        ? MovieStatus.fromJSON(object.changeMovieStatusReq)
        : undefined,
      movieStatusChanged: isSet(object.movieStatusChanged)
        ? MovieStatusChanged.fromJSON(object.movieStatusChanged)
        : undefined,
      changeSeekReq: isSet(object.changeSeekReq) ? globalThis.Number(object.changeSeekReq) : 0,
      checkReq: isSet(object.checkReq) ? CheckReq.fromJSON(object.checkReq) : undefined,
      peopleChanged: isSet(object.peopleChanged) ? globalThis.Number(object.peopleChanged) : 0,
      moviesChanged: isSet(object.moviesChanged) ? Sender.fromJSON(object.moviesChanged) : undefined,
      currentChanged: isSet(object.currentChanged) ? Sender.fromJSON(object.currentChanged) : undefined,
    };
  },

  toJSON(message: ElementMessage): unknown {
    const obj: any = {};
    if (message.type !== 0) {
      obj.type = elementMessageTypeToJSON(message.type);
    }
    if (message.time !== 0) {
      obj.time = Math.round(message.time);
    }
    if (message.error !== "") {
      obj.error = message.error;
    }
    if (message.chatReq !== "") {
      obj.chatReq = message.chatReq;
    }
    if (message.chatResp !== undefined) {
      obj.chatResp = ChatResp.toJSON(message.chatResp);
    }
    if (message.changeMovieStatusReq !== undefined) {
      obj.changeMovieStatusReq = MovieStatus.toJSON(message.changeMovieStatusReq);
    }
    if (message.movieStatusChanged !== undefined) {
      obj.movieStatusChanged = MovieStatusChanged.toJSON(message.movieStatusChanged);
    }
    if (message.changeSeekReq !== 0) {
      obj.changeSeekReq = message.changeSeekReq;
    }
    if (message.checkReq !== undefined) {
      obj.checkReq = CheckReq.toJSON(message.checkReq);
    }
    if (message.peopleChanged !== 0) {
      obj.peopleChanged = Math.round(message.peopleChanged);
    }
    if (message.moviesChanged !== undefined) {
      obj.moviesChanged = Sender.toJSON(message.moviesChanged);
    }
    if (message.currentChanged !== undefined) {
      obj.currentChanged = Sender.toJSON(message.currentChanged);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ElementMessage>, I>>(base?: I): ElementMessage {
    return ElementMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ElementMessage>, I>>(object: I): ElementMessage {
    const message = createBaseElementMessage();
    message.type = object.type ?? 0;
    message.time = object.time ?? 0;
    message.error = object.error ?? "";
    message.chatReq = object.chatReq ?? "";
    message.chatResp = (object.chatResp !== undefined && object.chatResp !== null)
      ? ChatResp.fromPartial(object.chatResp)
      : undefined;
    message.changeMovieStatusReq = (object.changeMovieStatusReq !== undefined && object.changeMovieStatusReq !== null)
      ? MovieStatus.fromPartial(object.changeMovieStatusReq)
      : undefined;
    message.movieStatusChanged = (object.movieStatusChanged !== undefined && object.movieStatusChanged !== null)
      ? MovieStatusChanged.fromPartial(object.movieStatusChanged)
      : undefined;
    message.changeSeekReq = object.changeSeekReq ?? 0;
    message.checkReq = (object.checkReq !== undefined && object.checkReq !== null)
      ? CheckReq.fromPartial(object.checkReq)
      : undefined;
    message.peopleChanged = object.peopleChanged ?? 0;
    message.moviesChanged = (object.moviesChanged !== undefined && object.moviesChanged !== null)
      ? Sender.fromPartial(object.moviesChanged)
      : undefined;
    message.currentChanged = (object.currentChanged !== undefined && object.currentChanged !== null)
      ? Sender.fromPartial(object.currentChanged)
      : undefined;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(globalThis.Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
