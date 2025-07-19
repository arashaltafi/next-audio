"use client"

import Player from '@/components/Player'
import React from 'react'

const CustomPlayer = () => {
    return (
        <div className='w-full h-screen flex flex-col items-center justify-start gap-16 p-16'>
            <h1>CustomPlayer</h1>

            <Player
                id={1}
                img="https://arashaltafi.ir/url_sample/jpg.jpg"
                isFav={true}
                name='text'
                onBackClick={() => { }}
                onNextClick={() => { }}
                singer='singer'
                src='https://arashaltafi.ir/url_sample/mp3.mp3'
                text='text'
            />
        </div>
    )
}

export default CustomPlayer