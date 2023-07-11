import { useState } from "react";
import styles from "./Add Product.module.css";
import { MdClear, MdAdd } from "react-icons/md";
import { useDispatch } from "react-redux";
import { createProduct } from "../../../../redux/actions";
import validation from "./validation";

const Add_Product = () => {
    const dispatch = useDispatch();

    const [error, setError] = useState({});

    const sizes = [
        "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10",
        "10.5", "11", "11.5", "12", "12.5", "13", "13.5", "14", "14.5", "15"
    ];

    const gender = ["Man", "Woman", "Unisex"];

    const [data, setData] = useState({
        name: "",
        brand_name: "",
        category: [""],
        color: "",
        gender: "Man",
        main_picture_url: "",
        retail_price_cents: "0",
        slug: "",
        status: "",
    });

    const handleChange = ({ target: { name, value } }) => {
        setData({
            ...data,
            [name]: value,
        });
    };

    const submit = ({ target: { name, value } }) => {
        data.slug = `${data.name.replace(/\s/g, "-")}`;
        const stockIsValid = stocks.every(stock => stock.size !== "" && stock.quantity > 0);
        const categoryIsValid = data.category.every(category => category !== "");
        if(!categoryIsValid || !stockIsValid || !data.name.length || !data.brand_name.length || !data.color || !data.main_picture_url || data.retail_price_cents < 0) {
            setError(validation({ ...data, [name]: value }, stockIsValid, categoryIsValid));
        } else {
            dispatch(createProduct(data, stocks));
            setData({
                name: "",
                brand_name: "",
                category: [""],
                color: "",
                gender: "Man",
                main_picture_url: "",
                retail_price_cents: 0,
                slug: "",
                status: "",
            });
            setStocks([{
                size: "",
                quantity: 1
            }]);
        };
    };

    const handleDraft = (event) => {
        event.preventDefault();
        setData(data.status = "draft");
        submit(event);
    };

    const handleActive = (event) => {
        event.preventDefault();
        setData(data.status = "active");
        submit(event);
    };

    // MANEJO DE CATEGORIAS
    const handleAddCategory = () => {
        setData({
          ...data,
          category: [...data.category, ""]
        });
      };

    const handleRemoveCategory = (index) => {
        setData({
            ...data,
            category: data.category.filter((_, i) => i !== index),
        });
    };

    const handleChangeCategory = ({ target: { value } }, index) => {
        setData({
            ...data,
            category: data.category.map((category, i) => (i === index ? value : category))
        });
    };

    // MANEJO DE STOCK
    const [stocks, setStocks] = useState([{
        size: "",
        quantity: "1"
    }]);

    const handleAddStock = () => {
        setStocks([
            ...stocks,
            {
                size: "",
                quantity: "1"
            }
        ]);
    };

    const handleRemoveStock = (index) => {
        setStocks(stocks.filter((_, i) => i !== index));
    };

    const handleChangeStockSize = ({ target: { value } }, index) => {
        setStocks(
            stocks.map((stock, i) => i === index ? { ...stock, size: value } : stock)
        );
    };

    const handleChangeStockQuantity = ({ target: { value } }, index) => {
        setStocks(
            stocks.map((stock, i) => i === index ? { ...stock, quantity: parseInt(value) } : stock)
        );
    };
    console.log(stocks);
    return (
        <div className={styles.container}>
            <div>
                <h1>Add new product</h1>
            </div>
            <div className={styles.containerform}>
                <form>
                    {/* NAME */}
                    <div>
                        <div className={styles.container_label_error}>
                            <label htmlFor="name">Product name</label>
                            {error.n1 && <p>{error.n1}</p>}
                        </div>
                        <input type="text" name="name" value={data.name} onChange={handleChange} />
                    </div>
                    {/* BRAND NAME */}
                    <div>
                        <div className={styles.container_label_error}>
                            <label htmlFor="brand_name">Brand name</label>
                            {error.bn1 && <p>{error.bn1}</p>}
                        </div>
                        <input type="text" name="brand_name" value={data.brand_name} onChange={handleChange} />
                    </div>
                    {/* CATEGORY */}
                    <div className={styles.category2}>
                        <label htmlFor="category">Category</label>
                        {error.ca1 && <p>{error.ca1}</p>}
                        <button type="button" onClick={handleAddCategory}><MdAdd /></button>
                    </div>
                    <div className={styles.container_category}>
                        {data.category.map((category, index) => (
                            <div key={index} className={styles.category}>
                                <input
                                    type="text"
                                    name={`category-${index}`}
                                    value={category}
                                    onChange={(event) => handleChangeCategory(event, index)}
                                />
                                {data.category.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveCategory(index)}>
                                            <MdClear />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    {/* COLOR */}
                    <div>
                        <div className={styles.container_label_error}>
                            <label htmlFor="color">Color</label>
                            {error.c1 && <p>{error.c1}</p>}
                        </div>
                        <input type="text" name="color" value={data.color} onChange={handleChange} />
                    </div>
                    {/* GENDER */}
                    <div>
                        <label htmlFor="gender">Gender</label>
                    </div>
                    <select name="gender" value={data.gender} onChange={handleChange}>
                        {gender.map((props) => <option key={props} value={props}>{props}</option>)}
                    </select>
                    {/* IMAGE */}
                    <div>
                        <div className={styles.container_label_error}>
                            <label htmlFor="main_picture_url">Image</label>
                            {error.mp1 && <p>{error.mp1}</p>}
                        </div>
                        <input type="text" name="main_picture_url" value={data.main_picture_url} onChange={handleChange} />
                    </div>
                    {/* PRICE */}
                    <div>
                        <div className={styles.container_label_error}>
                            <label htmlFor="retail_price_cents">Price</label>
                            {error.p1 && <p>{error.p1}</p>}
                        </div>
                        <input type="number" name="retail_price_cents" value={data.retail_price_cents} onChange={handleChange} min={0} pattern="[0-9]*" />
                    </div>
                    {/* STOCK */}
                    <div className={styles.category2}>
                        <label htmlFor="stock">Stock</label>
                        {error.s1 && <p>{error.s1}</p>}
                        <button type="button" onClick={handleAddStock}><MdAdd /></button>
                    </div>
                    <div className={styles.container_category}>
                        {stocks.map((stock, index) => (
                            <div key={index} className={styles.category}>
                                <label htmlFor={`stock-size-${index}`}>Size</label>
                                <select
                                    id={`stock-size-${index}`}
                                    name={`stock-size-${index}`}
                                    value={stock.size}
                                    onChange={(event) => handleChangeStockSize(event, index)}
                                >
                                    <option value="">Select Size</option>
                                    {sizes.map((size) => (
                                        <option key={size} value={size} disabled={stocks.some(stock => stock.size === size)}>
                                            {size}
                                        </option>
                                    ))}
                                </select>
                                {/* <input
                                    type="text"
                                    id={`stock-size-${index}`}
                                    name={`stock-size-${index}`}
                                    value={stock.size}
                                    onChange={(event) => handleChangeStockSize(event, index)}
                                /> */}
                                <label htmlFor={`stock-quantity-${index}`}>Quantity</label>
                                <input
                                    type="number"
                                    id={`stock-quantity-${index}`}
                                    name={`stock-quantity-${index}`}
                                    value={stock.quantity}
                                    onChange={(event) => handleChangeStockQuantity(event, index)}
                                    min={1}
                                    pattern="[0-9]*"
                                />
                                {stocks.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveStock(index)}>
                                            <MdClear />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    {/* BUTTON */}
                    <div className={styles.container_button}>
                        <button type="submit" onClick={handleDraft}>Save draft</button>
                        <button type="submit" onClick={handleActive}>Publish</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export { Add_Product };
