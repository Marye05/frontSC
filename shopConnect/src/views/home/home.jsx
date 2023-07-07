import ProductsContainer  from "../../components/productsContainer/productsContainer";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getProducts } from "../../redux/actions";
import style from './home.module.css'
import Carousel from "../../components/carousel/Carousel.jsx";

const Home = () => {

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getProducts());
    }, [dispatch]);
  
    return (
        <div className={style.home}>
            <Carousel />

            <ProductsContainer />
        </div>
    );
};

export default Home ;