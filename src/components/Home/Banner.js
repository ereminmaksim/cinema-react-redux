import React, {useEffect, useState} from 'react';
import axios from "../../api/getAxios";
import requests, {BASE_URL} from "../../api/Requests"

const Banner = () => {
    const [movie, setMovie] = useState([])


    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals)
            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                    ]
            )
            return request
        }

        fetchData()
    }, [])

    console.log(movie)

    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n - 1) + "..." : string
    }


    return (
        <div className='app__featured'>
            <div className='app__overlay text-amber-50'
                // <header className='h-[613px] text-amber-50 object-contain relative w-full'
                 style={{
                     backgroundImage: `url(${BASE_URL}${movie?.backdrop_path})`,
                     // `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`
                     backgroundPosition: "right top",
                     backgroundSize: "cover",

                 }}>

            </div>

                {/*контент*/}
                <div className="ml-[30px] pt-[210px] h-[190px] relative text-amber-50">
                    {/*Именное название*/}
                    <h1 className="text-5xl text-amber-50 font-extrabold pb-1.5">
                        {movie?.title || movie?.name || movie?.original_name}
                    </h1>
                    {/*Кнопки для баннера*/}
                    <div>
                        <button className='banner-btn'>Play</button>
                        <button className='banner-btn'>My List</button>
                    </div>

                    <h1 className="title_content text-2xl pt-[16px] h[80px] text-amber-50">
                        {truncate(`${movie.overview}`, 150)}</h1>
                </div>

            <div className="custom-banner"></div>

        </div>
    );
}


export default Banner;