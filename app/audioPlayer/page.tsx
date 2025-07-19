"use client";

import React, { useState, useRef, useEffect } from 'react';

interface Song {
    name: string;
    path: string;
    img: string;
    singer: string;
}

const AudioPlayer = () => {
    const [indexNo, setIndexNo] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [volume, setVolume] = useState<number>(90);
    const [autoplay, setAutoplay] = useState<number>(0);
    const [sliderValue, setSliderValue] = useState<number>(0);
    const audioRef = useRef<HTMLAudioElement>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const songs: Song[] = [
        { name: "first song", path: "https://arashaltafi.ir/url_sample/mp3.mp3", img: "https://arashaltafi.ir/Social_Media/story-02.jpg", singer: "1" },
        { name: "second song", path: "https://arashaltafi.ir/url_sample/mp3.mp3", img: "https://arashaltafi.ir/Social_Media/story-03.jpg", singer: "2" },
        { name: "third song", path: "https://arashaltafi.ir/url_sample/mp3.mp3", img: "https://arashaltafi.ir/Social_Media/story-04.jpg", singer: "3" },
        { name: "fourth song", path: "https://arashaltafi.ir/url_sample/mp3.mp3", img: "https://arashaltafi.ir/Social_Media/story-05.jpg", singer: "4" },
        { name: "fifth song", path: "https://arashaltafi.ir/url_sample/mp3.mp3", img: "https://arashaltafi.ir/Social_Media/story-01.jpg", singer: "5" },
    ];

    const loadTrack = (index: number) => {
        if (audioRef.current) {
            audioRef.current.src = songs[index].path;
            audioRef.current.load();
            setSliderValue(0);
        }

        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        timerRef.current = setInterval(rangeSlider, 1000);
    };

    useEffect(() => {
        loadTrack(indexNo);
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [indexNo]);

    const muteSound = () => {
        if (audioRef.current) {
            audioRef.current.volume = 0;
        }
        setVolume(0);
    };

    const justPlay = () => {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    };

    const playSong = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
        setIsPlaying(true);
    };

    const pauseSong = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
        setIsPlaying(false);
    };

    const nextSong = () => {
        if (indexNo < songs.length - 1) {
            setIndexNo(indexNo + 1);
        } else {
            setIndexNo(0);
        }
        playSong();
    };

    const previousSong = () => {
        if (indexNo > 0) {
            setIndexNo(indexNo - 1);
        } else {
            setIndexNo(songs.length - 1);
        }
        playSong();
    };

    const volumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseInt(e.target.value, 10);
        if (audioRef.current) {
            audioRef.current.volume = newVolume / 100;
        }
        setVolume(newVolume);
    };

    const changeDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            const newPosition = audioRef.current.duration * (parseInt(e.target.value, 10) / 100);
            audioRef.current.currentTime = newPosition;
        }
        setSliderValue(parseInt(e.target.value, 10));
    };

    const autoplaySwitch = () => {
        setAutoplay((prevAutoplay) => (prevAutoplay === 1 ? 0 : 1));
    };

    const rangeSlider = () => {
        if (audioRef.current) {
            const position = audioRef.current.currentTime * (100 / audioRef.current.duration);
            setSliderValue(position);
        }

        if (audioRef.current && audioRef.current.ended) {
            setIsPlaying(false);
            if (autoplay === 1) {
                nextSong();
            }
        }
    };

    return (
        <div className="relative min-h-[90vh] w-full flex items-center justify-center bg-[#232427] rounded-lg shadow-[inset_5px_5px_5px_rgba(0,0,0,0.2),inset_-5px_-5px_15px_rgba(255,255,255,0.1),5px_5px_15px_rgba(0,0,0,0.3),-5px_-5px_15px_rgba(255,255,255,0.1)] p-4 overflow-hidden">
            <p id="logo" className="absolute top-2 left-8 text-2xl text-gray-300">
                <i className="fa fa-music mr-4"></i>Music
            </p>

            <div className="show_song_no absolute top-2 right-2 flex items-center justify-center w-12 h-8 p-2 text-white bg-[rgba(255,255,255,0.2)] rounded shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2),inset_-2px_-2px_5px_rgba(255,255,255,0.1),5px_5px_15px_rgba(0,0,0,0.3),-5px_-5px_15px_rgba(255,255,255,0.1)]">
                <p id="present">{indexNo + 1}</p>
                <p className="mx-1">/</p>
                <p id="total">{songs.length}</p>
            </div>

            <div className="left w-1/2 flex flex-col items-center">
                <img id="track_image" src={songs[indexNo].img} alt="Track" className="h-72 w-[80%] rounded-lg object-cover shadow-[inset_5px_5px_5px_rgba(0,0,0,0.2),inset_-5px_-5px_15px_rgba(255,255,255,0.1),5px_5px_15px_rgba(0,0,0,0.3),-5px_-5px_15px_rgba(255,255,255,0.1)] p-2" />
                <div className="volume mt-6 w-[80%] h-8 flex items-center justify-center text-white">
                    <p id="volume_show" className="font-bold text-sm bg-[rgba(245,245,245,0.1)] p-2">{volume}</p>
                    <i className="fa fa-volume-up mx-2 p-2 bg-[#148F77] cursor-pointer" aria-hidden="true" onClick={muteSound} id="volume_icon"></i>
                    <input type="range" min="0" max="100" value={volume} onChange={volumeChange} id="volume" className="flex-1" />
                </div>
            </div>

            <div className="right w-1/2 flex flex-col items-center py-2">
                <div className="song_detail relative w-[80%] mb-24 overflow-hidden">
                    <p id="title" className="capitalize text-white text-2xl">{songs[indexNo].name}</p>
                    <p id="artist" className="capitalize text-white text-lg mt-1">{songs[indexNo].singer}</p>
                </div>

                <div className="middle w-full flex items-center justify-center">
                    <button onClick={previousSong} id="pre" className="mx-2 p-2 bg-[#232427] rounded-full h-16 w-16 flex items-center justify-center shadow-[inset_5px_5px_5px_rgba(0,0,0,0.2),inset_-5px_-5px_15px_rgba(255,255,255,0.1),5px_5px_15px_rgba(0,0,0,0.3),-5px_-5px_10px_rgba(255,255,255,0.1)] transition duration-500">
                        <i className="fa fa-backward text-2xl text-white" aria-hidden="true"></i>
                    </button>
                    <button onClick={justPlay} id="play" className={`mx-2 p-2 rounded-full h-16 w-16 flex items-center justify-center shadow-[inset_5px_5px_5px_rgba(0,0,0,0.2),inset_-5px_-5px_15px_rgba(255,255,255,0.1),5px_5px_15px_rgba(0,0,0,0.3),-5px_-5px_10px_rgba(255,255,255,0.1)] transition duration-500 ${isPlaying ? 'bg-[#148F77]' : 'bg-[#232427]'}`}>
                        <i className={`fa ${isPlaying ? 'fa-pause' : 'fa-play'} text-2xl text-white`} aria-hidden="true"></i>
                    </button>
                    <button onClick={nextSong} id="next" className="mx-2 p-2 bg-[#232427] rounded-full h-16 w-16 flex items-center justify-center shadow-[inset_5px_5px_5px_rgba(0,0,0,0.2),inset_-5px_-5px_15px_rgba(255,255,255,0.1),5px_5px_15px_rgba(0,0,0,0.3),-5px_-5px_10px_rgba(255,255,255,0.1)] transition duration-500">
                        <i className="fa fa-forward text-2xl text-white" aria-hidden="true"></i>
                    </button>
                </div>

                <div className="duration mt-12 w-[80%] flex items-center justify-center">
                    <input type="range" min="0" max="100" value={sliderValue} onChange={changeDuration} id="duration_slider" className="flex-1" />
                </div>
                <button onClick={autoplaySwitch} id="auto" className="mt-4 text-center text-sm cursor-pointer border-none p-2 text-white bg-[rgba(255,255,255,0.2)] rounded shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2),inset_-2px_-2px_5px_rgba(255,255,255,0.1),5px_5px_15px_rgba(0,0,0,0.3),-5px_-5px_15px_rgba(255,255,255,0.1)]">
                    Autoplay: {autoplay === 1 ? 'On' : 'Off'}
                </button>
            </div>

            <audio ref={audioRef}></audio>
        </div>
    );
};

export default AudioPlayer;