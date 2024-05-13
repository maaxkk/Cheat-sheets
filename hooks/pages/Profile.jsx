import React, {useEffect, useRef, useState} from 'react';
import {useLocalStorage} from "../src/useCustomHooks/useLocalStorage.js";
import {useParams, useSearchParams} from "react-router-dom";
import {API_KEY_CATS} from "../api_key.js";

function Profile() {
    const [personData, setPersonData] = useLocalStorage('personData')
    const [isLoading, setIsLoading] = useState(true);
    const imgRef = useRef();
    const {username} = useParams();

    useEffect(() => {
        if (isLoading) {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    }, [isLoading]);

    function copyToClipboard() {
        navigator.clipboard.writeText(`localhost:5173/profile/${username}`)
    }

    async function fetchCat() {
        const response = await fetch
        (`https://api.thecatapi.com/v1/images/search?limit=1&breed_ids=beng&api_key=${API_KEY_CATS}`, {mode: "cors"})
        const data = await response.json()
        return data[0].url;
    }

    useEffect(() => {
        if (isLoading) imgRef.current.src = "https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif";
        else {
            fetchCat().then(res => {
                imgRef.current.src = res
                console.log(res)
            })
        }
    }, [isLoading]);


    return (
        <div>
            <h1>Hi, {personData.name}!</h1>
            <img style={{maxWidth: '300px'}} alt={'Image of cat'} ref={imgRef}/>
            <br/>
            <div>
                <h2>User settings</h2>
                <br/>
                <p>Name: {personData.name}</p>
                <p>Lastname: {personData.lastname}</p>
                <p>Phone: {personData.phone}</p>
                <p>Email: {personData.email}</p>
                <p>Hobby: {personData.hobby}</p>
                <button onClick={copyToClipboard}>Share profile</button>
            </div>
        </div>
    );
}

export default Profile;