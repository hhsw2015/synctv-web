import { roomStore } from "@/stores/room";
import { debounces } from "@/utils";
import { useDebounceFn } from "@vueuse/core";
import { ElNotification } from "element-plus";
import { ElementMessage, ElementMessageType } from "@/proto/message";
const room = roomStore();

interface callback {
  publishStatus: (msg: ElementMessage) => boolean;
  sendDanmuku: (msg: string) => void;
}

interface resould {
  plugin: (art: Artplayer) => unknown;
  setAndNoPublishSeek: (seek: number) => void;
  setAndNoPublishPlay: () => void;
  setAndNoPublishPause: () => void;
  setAndNoPublishRate: (rate: number) => void;
}

const debounceTime = 500;

export const sync = (cbk: callback): resould => {
  const playingStatusDebounce = debounces(debounceTime);
  let player: Artplayer | undefined = undefined;

  let lastestSeek = 0;

  const publishSeek = () => {
    if (!player || player.option.isLive) return;
    cbk["publishStatus"](
      ElementMessage.create({
        type: ElementMessageType.CHANGE_SEEK,
        seek: player.currentTime,
        rate: player.playbackRate
      })
    );
    console.log("视频空降，:", player.currentTime);
  };

  const __publishSeekDebounce = useDebounceFn(publishSeek, debounceTime);

  const publishSeekDebounce = function () {
    lastestSeek = Date.now();
    __publishSeekDebounce();
  };

  const setAndNoPublishSeek = (seek: number) => {
    lastestSeek = Date.now();
    if (!player || player.option.isLive || Math.abs(player.currentTime - seek) < 2) return;
    player.currentTime = seek;
  };

  const publishPlay = () => {
    if (!player || player.option.isLive) return;
    console.log("视频播放,seek:", player.currentTime);
    cbk["publishStatus"](
      ElementMessage.create({
        type: ElementMessageType.PLAY,
        seek: player.currentTime,
        rate: player.playbackRate
      })
    );
  };

  const publishPlayDebounce = playingStatusDebounce(publishPlay);

  const setAndNoPublishPlay = () => {
    if (!player || player.option.isLive || player.playing) return;
    player.off("play", publishPlayDebounce);
    player.once("play", () => {
      !player || player.on("play", publishPlayDebounce);
    });
    player.play().catch(() => {
      !player || (player.muted = true);
      !player || player.play();
      ElNotification({
        title: "温馨提示",
        type: "info",
        message: "由于浏览器限制，播放器已静音，请手动开启声音"
      });
    });
  };

  const publishPause = () => {
    if (!player || player.option.isLive) return;
    console.log("视频暂停,seek:", player.currentTime);
    cbk["publishStatus"](
      ElementMessage.create({
        type: ElementMessageType.PAUSE,
        seek: player.currentTime,
        rate: player.playbackRate
      })
    );
  };

  const publishPauseDebounce = playingStatusDebounce(publishPause);

  const setAndNoPublishPause = () => {
    if (!player || player.option.isLive || !player.playing) return;
    player.off("pause", publishPauseDebounce);
    player.once("pause", () => {
      !player || player.on("pause", publishPauseDebounce);
    });
    player.pause();
  };

  const publishRate = () => {
    if (!player || player.option.isLive) return;
    cbk["publishStatus"](
      ElementMessage.create({
        type: ElementMessageType.CHANGE_RATE,
        seek: player.currentTime,
        rate: player.playbackRate
      })
    );
    console.log("视频倍速,seek:", player.currentTime);
  };

  const setAndNoPublishRate = (rate: number) => {
    if (!player || player.option.isLive || player.playbackRate === rate) return;
    player.off("video:ratechange", publishRate);
    player.once("video:ratechange", () => {
      !player || player.on("video:ratechange", publishRate);
    });
    player.playbackRate = rate;
  };

  const checkSeek = () => {
    // 距离上一次seek超过10s后才会检查seek
    if (!player || Date.now() - lastestSeek < 10000 || player.option.isLive) return;
    player.duration - player.currentTime > 5 &&
      cbk["publishStatus"](
        ElementMessage.create({
          type: ElementMessageType.CHECK_SEEK,
          seek: player.currentTime,
          rate: player.playbackRate
        })
      );
  };

  const plugin = (art: Artplayer) => {
    player = art;
    lastestSeek = Date.now();
    if (!art.option.isLive) {
      const intervals: number[] = [];

      art.once("ready", () => {
        console.log(room.currentMovieStatus.seek);
        setAndNoPublishSeek(room.currentMovieStatus.seek);
        console.log("seek同步成功:", art.currentTime);

        setAndNoPublishRate(room.currentMovieStatus.rate);
        console.log("rate同步成功:", art.playbackRate);
        room.currentMovieStatus.playing ? setAndNoPublishPlay() : setAndNoPublishPause();
        cbk["sendDanmuku"]("PLAYER：视频已就绪");

        intervals.push(setInterval(checkSeek, 5000));
      });

      art.on("play", publishPlayDebounce);

      // 视频暂停
      art.on("pause", publishPauseDebounce);

      // 空降
      art.on("video:seeking", publishSeekDebounce);

      // 倍速
      art.on("video:ratechange", publishRate);

      art.on("destroy", () => {
        player = undefined;
        intervals.forEach((interval) => {
          clearInterval(interval);
        });
        art.off("play", publishPlayDebounce);
        art.off("pause", publishPauseDebounce);
        art.off("video:seeking", publishSeekDebounce);
        art.off("video:ratechange", publishRate);
      });
    } else {
      art.once("ready", () => {
        art.play().catch(() => {
          art.muted = true;
          art.play();
          ElNotification({
            title: "温馨提示",
            type: "info",
            message: "由于浏览器限制，播放器已静音，请手动开启声音"
          });
        });
        cbk["sendDanmuku"]("PLAYER：视频已就绪");
      });
    }
  };

  return {
    plugin,
    setAndNoPublishSeek,
    setAndNoPublishPlay,
    setAndNoPublishPause,
    setAndNoPublishRate
  };
};
