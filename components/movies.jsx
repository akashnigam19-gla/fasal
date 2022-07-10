import { useEffect, useState } from "react";
import firebase from "../lib/firebase";
import { useAuth } from '../context/AuthUserContext';

export default function Movies() {
    const { authUser } = useAuth();
    const [searchTerm, setSearchTerm] = useState("")
    const [movies, setMovies] = useState({})
    const [playList, setPlayList] = useState([])

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value)
    }

    useEffect(async() => {
        const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=d7f71334`;
        const res = await fetch(URL);
        const data = await res.json();
        // console.log(data);
        setMovies(data)
    }, [searchTerm])
    
    
    useEffect(async() => {
        // get playList from firebase firestore
        try{
            const db = firebase.firestore();
            await db.collection("users").doc(authUser.uid).get().then(doc => {
                setPlayList(...playList , doc.data().playList)
                console.log(doc.data())
            })
        }
        catch(err) {
            const db = firebase.firestore();
            await db.collection("users").doc(authUser.uid).set({
                playList: []
            })
        }
    }, [])
    

    return (
        <>
            <div className="search-container">
                <div className="search-element">
                    <h3>Search Movie:</h3>
                    <input 
                    type = "text" 
                    className = "form-control" 
                    placeholder="Search Movie Title ..." 
                    id = "movie-search-box"
                    onChange={handleSearchTermChange}
                    />
                    <div className="search-list">
                        {searchTerm.length > 0 &&
                            <ul>
                                {
                                    // if movies.search is not undefined
                                    movies.Search && movies.Search.map((movie, index) => {
                                        return (
                                            <li key={index}>
                                                <div className="center" onClick={
                                                    () => {
                                                        setPlayList([...playList, movie])
                                                        const db = firebase.firestore();
                                                        db.collection("users").doc(authUser.uid).update({
                                                            playList: [...playList, movie]
                                                        })

                                                    }
                                                }>
                                                    <img src={movie.Poster} className="list-img" />
                                                    <p className="movie-title">{movie.Title}</p>
                                                </div>
                                            </li>
                                            // <li key={index}>{movie.Title}</li>
                                        )
                                    }
                                    )
                                }
                            </ul>
                        }
                    </div>
                </div>
            </div>
        </>
    )    
}