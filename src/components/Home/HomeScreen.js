import React from 'react';
import Navbar from "./Navbar";
import Banner from "./Banner";
import Row from "./Row";
import requests from "../../api/Requests";

const HomeScreen = () => {
    return (
        <>
            <Navbar/>
            <Banner/>

            <Row title="NETFLIX ORIGINAL"
                 fetchURL={requests.fetchTrending}
                 isLargeRow
            />
            <Row title="Популярное на Neflix" fetchURL={requests.fetchTrending}/>
            <Row title="Топ 10" fetchURL={requests.fetchTopRated}/>
            <Row title="Приключенческие фильмы" fetchURL={requests.fetchActionMovies}/>
            <Row title="Комедии" fetchURL={requests.fetchComedyMovies}/>
            <Row title="Научна фанстастика в жанре ужасов" fetchURL={requests.fetchHorrorMovies}/>
            <Row title="Документальные фильмы" fetchURL={requests.fetchRomanceMovies}/>
            <Row title="Научно-фантастические и фэнтези-сериалы" fetchURL={requests.fetchDocumentaries}/>


        </>
    );
}

export default HomeScreen;