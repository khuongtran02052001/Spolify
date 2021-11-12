import React, { useEffect, useState } from 'react'
import Body from './Body'
import Right from './Right'
import Slidebar from './Slidebar'
import SpotifyWebApi from 'spotify-web-api-node'
import { useRecoilState } from 'recoil'
import { playingTrackState } from '../atoms/playerAtom'
import { useSession } from 'next-auth/react'
import Player from './Player'

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID
})


const Dashboard = () => {

    const { data: session } = useSession();
    const { accessToken } = session;

    const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState)

    const [showPlayer, setShowPlayer] = useState<boolean>(false)

    useEffect(() => {
        setShowPlayer(true)
    }, [])

    const chooseTrack = (track) => {
        setPlayingTrack(track)
    }

    return (
        <main className="flex min-h-screen min-w-max bg-black lg:pb-24">
            <Slidebar />
            <Body chooseTrack={chooseTrack} spotifyApi={spotifyApi} />
            <Right chooseTrack={chooseTrack} spotifyApi={spotifyApi} />
            {showPlayer && (
                <div className='fixed bottom-0 left-0 right-0 z-50'>
                    <Player accessToken={accessToken} trackUri={(playingTrack as any).uri} />
                </div>
            )}
        </main>
    )
}

export default Dashboard
