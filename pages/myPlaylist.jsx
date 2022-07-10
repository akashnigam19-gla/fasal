import { useEffect, useState } from "react";
import firebase from "../lib/firebase";
import { useAuth } from '../context/AuthUserContext';
import { useRouter } from 'next/router';

export default function MyPlaylist() {
    const [playList, setPlayLists] = useState([])
    const { authUser, loading, signOut } = useAuth();
    const router = useRouter();

    useEffect(async() => {
        // get playList from firebase firestore
        const db = firebase.firestore();
        await db.collection("users").doc(authUser.uid).get().then(doc => {
            setPlayLists(...playList , doc.data().playList)
            console.log(doc.data())
        }
        )
    }, [])



    return (
        <div className="my-playlist">
            <button onClick={() => router.push("/home")}>Home</button>
            
            <h3>My Playlist</h3>
            {
                playList.length > 0 &&
                <ul>
                    {
                        playList.map((movie, index) => {
                            return (
                                <li key={index}>
                                    <div className="center">
                                        <img src={movie.Poster} className="list-img" />
                                        <p className="movie-title">{movie.Title}</p>
                                        <button
                                            className="remove-btn" 
                                            onClick={() => {
                                            const db = firebase.firestore();
                                            db.collection("users").doc(authUser.uid).update({
                                                playList: playList.filter(item => item.imdbID !== movie.imdbID)
                                            })
                                            setPlayLists(playList.filter(item => item.imdbID !== movie.imdbID))
                                        }
                                        }>Remove</button>
                                    </div>
                                </li>
                            )
                        }
                        )
                    }
                </ul>
            }
        </div>
    )
}