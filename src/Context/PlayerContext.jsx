import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const [track, setTrack] = useState(songsData[0]);
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0,
        },
        totalTime: {
            second: 0,
            minute: 0,
        }
    });

    const play = () => {
        audioRef.current.play();
        setPlayStatus(true);
    };

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    };
    const playWithId = async (id)=>{
        await setTrack(songsData[id])
        await audioRef.current.play();
        setPlayStatus(true)
    }
    const previous=async ()=>{
        if(track.id>0){
            await setTrack(songsData[track.id-1]);
            await audioRef.current.play();
            setPlayStatus(true)
        }
    }


    const next=async ()=>{
        if(track.id<songsData.length-1){
            await setTrack(songsData[track.id+1]);
            await audioRef.current.play();
            setPlayStatus(true)
        }
    }


    const seekSong=async(e)=>{
     audioRef
     .current.currentTime=((e.nativeEvent.offsetX / seekBg.current.offsetWidth)*audioRef.current.duration)
    }

    useEffect(() => {
        if (audioRef.current) {
            const updateCurrentTime = () => {
                seekBar.current.style.width=(Math.floor(audioRef.current.currentTime/audioRef.current.duration*100))
                const currentTime = audioRef.current.currentTime;
                const duration = audioRef.current.duration;
                const seekBarWidth = (currentTime / duration) * 100 + '%';
            
            
            seekBar.current.style.width = seekBarWidth;


                setTime({
                    currentTime: {
                        second: Math.floor(currentTime % 60),
                        minute: Math.floor(currentTime / 60),
                    },
                    totalTime: {
                        second: Math.floor(duration % 60),
                        minute: Math.floor(duration / 60),
                    }
                });
            };

            audioRef.current.ontimeupdate = updateCurrentTime;

            // Set the total time once metadata is loaded
            audioRef.current.onloadedmetadata = () => {
                const duration = audioRef.current.duration;
                setTime(prevTime => ({
                    ...prevTime,
                    totalTime: {
                        second: Math.floor(duration % 60),
                        minute: Math.floor(duration / 60),
                    }
                }));
            };
        }
    }, [audioRef]);

    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause,
        playWithId,
        previous,
        next,
        seekSong,
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;
