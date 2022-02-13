import React, {useEffect, useState} from 'react';
import getAxios from "../../api/getAxios";
import {BASE_URL} from "../../api/Requests";


const Row = ({ title, fetchURL,isLargeRow= false }) => {
    const [movie, setMovie] = useState([])


    useEffect(() => {
       async function fetchData() {
           const request = await getAxios(fetchURL)
           setMovie(request.data.results)
           return request
       }
        fetchData()
    }, [fetchURL]);

    console.log(movie)


    return (
        <div className=" text-slate-100 ml-[20px] ">
            <h2>{title}</h2>
            <div className="flex overflow-y-hidden overflow-x-scroll p-[20px] row_posters">
            {movie.map(movie => (
                // Внимательно изучить элементы сравнения
                ((isLargeRow && movie.poster_path) ||
                (!isLargeRow && movie.backdrop_path)) && (
                    <img
                        key={movie.id} className={`row_poster ${isLargeRow && 'row_posterLarge'}`} src={`${BASE_URL}${
                        isLargeRow ? movie.poster_path : movie.backdrop_path
                    }`}
                    alt={movie.name}
                    />
                )
            ))}
            </div>
        </div>
    );
}

export default Row;