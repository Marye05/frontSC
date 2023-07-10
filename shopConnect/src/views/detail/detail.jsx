import { useParams } from "react-router-dom";
import { getDetail } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styles from './detail.module.css'
import { IoCartOutline, IoCartSharp } from "react-icons/io5";
import { addToCart, removeFromCart, addToFav, removeFromFav } from '../../redux/actions';


const Detail = () => {
    const dispatch = useDispatch();
    const sneaker = useSelector((state)=>state.detail);
    const {id} = useParams();
    console.log(sneaker);
    useEffect(()=>{
        dispatch(getDetail(id))
        window.scrollTo(0, 0);

    },[dispatch])

    const formatPrice = (price) => {
        const formattedPrice = (price / 100).toFixed(2);
        return `${formattedPrice}`;
      };
    const handleCart = ()=>{
        addToCart(sneaker.id)
    }
    return (
        <div className={styles.contDetail}>
            <h1 className={styles.nameh3}>{sneaker.name} </h1>
            <div className={styles.detailz}>
            <img src={sneaker.main_picture_url} alt="background"/> 
            <div className={styles.data}>
            <h2>Brand:</h2>
            <h3>{sneaker.brand_name}</h3>
            <h2>Category:</h2>
            <h3>{sneaker.category}</h3>
            <h2>Color:</h2>
            <h3>{sneaker.color}</h3>
            
            <h1>$ {formatPrice(sneaker.retail_price_cents)}</h1>
           
            <div className={styles.buttons}>
                
                    <button onClick={handleCart}>
                        ADD CART.
                    </button>
               
            
            </div>
                
            </div>
            </div>
        </div>
    );
};

export default Detail