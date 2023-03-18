import { Link, useParams } from "react-router-dom";

function Product(props) {
    const { id, name, category, price, description } = props.product;

    const addToCart = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const { id, name, category, price, description } = props.product;

      try {
        const response = await fetch("http://localhost:8082/api/users/addToCart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ 
            userId: userId,
            itemName: name,
            itemDescription: description,
            itemPrice: price
          }),
        });
  
        if (response.status === 200) {
          const data = await response.json();
          console.log(data);
        } else {
          console.log(userId);
          const { message } = await response.json();
          setError(message);
        }
      } catch (error) {
        setError('An error occurred while processing your request. Please try again later.');
      }
    }
  
    return (
      <div className='product'>
        
          <Link to="/product" state={{ id: id,  description: description}}>
            <div className="p-img">
              <img src="https://www.lookchem.cn/ProImage/2010/0626/79-14-1.jpg"/>
            </div>
          </Link>

        <h3 className="label">{name}</h3>
        <p className="label">Category: {category}</p>
        <button className="inquriy" onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    );
}

export default Product;