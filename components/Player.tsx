"use client"

import React, { useEffect, useRef, useState } from 'react'
import { IoPlaySkipForward } from "react-icons/io5";
import { IoPlaySkipBack } from "react-icons/io5";
import { TbRepeatOff } from "react-icons/tb";
import { TbRepeat } from "react-icons/tb";
import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { FaPlayCircle } from "react-icons/fa";
import { FaPauseCircle } from "react-icons/fa";
import { convertSecondToTime } from '@/utils/Global';
import { GoUnmute } from "react-icons/go";
import { IoVolumeMuteOutline } from "react-icons/io5";
import { FiDownloadCloud } from "react-icons/fi";
import Image from 'next/image';
import { deleteIdFromStorage, LocalStorageRoutes, saveToLocalStorage } from '@/utils/LocalStorage';
import Divider from '@/components/Divider';

interface PropsType {
    id: number
    src: string
    singer: string
    name: string
    text: string
    img: string,
    isFav: boolean,
    onNextClick: () => void,
    onBackClick: () => void
}

const Player = (props: PropsType) => {
    const [isFav, setIsFav] = useState<boolean>(props.isFav)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [isMute, setIsMute] = useState<boolean>(false)
    const [isRepeat, setIsRepeat] = useState<boolean>(false)
    const [currentTime, setCurrentTime] = useState<number>(0)
    const [duration, setDuration] = useState<number>(0)
    const audioRef = useRef<HTMLAudioElement>(null)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        loadTrack()
    }, [props.src])

    // update time video
    useEffect(() => {
        const audioElement = audioRef.current;

        const handleTimeUpdate = () => {
            if (audioElement) {
                console.log('duration handleTimeUpdate:', audioElement.duration)
                setCurrentTime(audioElement.currentTime)
            }
        }

        const handleLoadedMetadata = () => {
            if (audioElement) {
                console.log('duration handleLoadedMetadata:', audioElement.duration)
                setDuration(audioElement.duration)
            }
        }

        if (audioElement) {
            audioElement.addEventListener('timeupdate', handleTimeUpdate)
            audioElement.addEventListener('loadedmetadata', handleLoadedMetadata)
            return () => {
                if (audioElement) {
                    audioElement.removeEventListener('timeupdate', handleTimeUpdate)
                    audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata)
                }
            }
        }
    }, [])

    const loadTrack = () => {
        if (audioRef.current) {
            audioRef.current.src = props.src
            audioRef.current.load()
            setCurrentTime(0)
            setDuration(0)
            playMusic()
        }
        if (timerRef.current) {
            clearInterval(timerRef.current)
        }
        timerRef.current = setInterval(rangeSlider, 1000)
    }

    const rangeSlider = () => {
        if (audioRef.current) {
            const position = audioRef.current.currentTime
            setCurrentTime(position)
        }

        if (audioRef.current && audioRef.current.ended) {
            setIsPlaying(false)
            if (isRepeat) {
                playMusic()
            }
        }
    }

    const handleFav = () => {
        if (isFav) {
            setIsFav(false)
            deleteIdFromStorage(LocalStorageRoutes.MUSIC, props.id)
        } else {
            setIsFav(true)
            saveToLocalStorage(LocalStorageRoutes.MUSIC, {
                id: props.id,
                name: props.name,
                singer: props.singer,
                src: props.src,
                img: props.img,
                text: props.text
            })
        }
    }

    const handleRepeat = () => {
        setIsRepeat(!isRepeat)
    }

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(event.target.value)
        setCurrentTime(newTime)
        if (audioRef.current) {
            audioRef.current.currentTime = newTime
        }
    }

    const playMusic = () => {
        if (audioRef.current) {
            audioRef.current.play()
        }
        setIsPlaying(true)
    }

    const pauseMusic = () => {
        if (audioRef.current) {
            audioRef.current.pause()
        }
        setIsPlaying(false)
    }

    const handleMuteSound = () => {
        if (isMute) {
            if (audioRef.current) {
                audioRef.current.volume = 1
            }
            setIsMute(false)
        } else {
            if (audioRef.current) {
                audioRef.current.volume = 0
            }
            setIsMute(true)
        }
    }

    const handleDownload = () => {
        const url = props.src
        const name = props.singer + '___' + props.name + '.mp3'
        const link = document.createElement('a')
        link.href = url
        link.download = name
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className='fixed bottom-0 left-0 right-0 z-30 w-full hidden1 flex flex-col gap-4 items-center justify-center py-4 px-1 sm:px-4 md:px-8 bg-slate-700/80 border-t border-slate-950 rounded-t-xl backdrop-blur-sm'>
            <div className='flex xl:hidden w-full gap-4 items-center justify-center'>
                <h4 className='text-base w-14 text-center text-nowrap line-clamp-1'>{convertSecondToTime(duration)}</h4>
                <input
                    dir='ltr'
                    type="range"
                    min="0"
                    max={duration}
                    step={1}
                    value={currentTime}
                    style={{ background: `linear-gradient(to right, #FB7185 ${(currentTime / duration) * 100}%, #E2E8F0 ${(currentTime / duration) * 100}%)` }}
                    className={`w-full disabled:opacity-30`}
                    onChange={handleTimeChange}
                />
                <h4 className='text-base w-14 text-center text-nowrap line-clamp-1'>{convertSecondToTime(currentTime)}</h4>
                <audio ref={audioRef} />
            </div>
            <footer className='w-full flex flex-col sm:flex-row items-center justify-center gap-x-8 gap-y-4'>
                <div className='flex w-full xl:w-auto items-center justify-center gap-4'>
                    <FiDownloadCloud
                        onClick={handleDownload}
                        className='cursor-pointer text-2xl'
                    />

                    <div onClick={handleFav} className='cursor-pointer'>
                        {
                            isFav ? (
                                <MdFavorite className='text-2xl' />
                            ) : (
                                <MdFavoriteBorder className='text-2xl' />
                            )
                        }
                    </div>

                    <div className='max-w-24 flex flex-col items-center justify-center gap-1 text-center'>
                        <h4 className='text-base font-medium'>{props.singer}</h4>
                        <h5 className='text-sm font-light'>{props.name}</h5>
                    </div>

                    <Image
                        src={props.img}
                        alt={props.name}
                        className='size-14 sm:size-16 md:size-18 bg-slate-700/80 p-px border-2 border-rose-500 rounded-full'
                        width={200}
                        height={200}
                    />
                </div>

                <Divider className='hidden xl:block' isVerticaly />

                <div className='hidden xl:flex flex-1 gap-4 items-center justify-center'>
                    <h4 className='text-base w-14 text-center text-nowrap line-clamp-1'>{convertSecondToTime(duration)}</h4>
                    <input
                        dir='ltr'
                        type="range"
                        min="0"
                        max={duration}
                        step={1}
                        value={currentTime}
                        style={{ background: `linear-gradient(to right, #FB7185 ${(currentTime / duration) * 100}%, #E2E8F0 ${(currentTime / duration) * 100}%)` }}
                        className={`w-full disabled:opacity-30`}
                        onChange={handleTimeChange}
                    />
                    <h4 className='text-base w-14 text-center text-nowrap line-clamp-1'>{convertSecondToTime(currentTime)}</h4>
                    <audio ref={audioRef} />
                </div>

                <Divider className='hidden sm:block' isVerticaly />

                <div className='flex w-full xl:w-auto gap-3 items-center justify-center'>
                    <div onClick={handleRepeat}>
                        {
                            isRepeat ? (
                                <TbRepeat className='icon-music' />
                            ) : (
                                <TbRepeatOff className='icon-music' />
                            )
                        }
                    </div>

                    <IoPlaySkipForward
                        onClick={() => props.onNextClick()}
                        className='icon-music'
                    />

                    <>
                        {
                            isPlaying ? (
                                <FaPauseCircle onClick={pauseMusic} className='icon-music text-5xl hover:scale-110 active:scale-90' />
                            ) : (
                                <FaPlayCircle onClick={playMusic} className='icon-music text-5xl hover:scale-110 active:scale-90' />
                            )
                        }
                    </>

                    <IoPlaySkipBack
                        onClick={() => props.onBackClick()}
                        className='icon-music'
                    />

                    <div onClick={handleMuteSound}>
                        {
                            isMute ? (
                                <IoVolumeMuteOutline className='icon-music' />
                            ) : (
                                <GoUnmute className='icon-music' />
                            )
                        }
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Player