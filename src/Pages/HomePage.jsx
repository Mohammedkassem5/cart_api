import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Products from "../components/Products";
import axios from "axios";

const HomePage = () => {
    const [prodcuts, setProdcuts] = useState([])
    useEffect(() => {
        axios.get("https://fakestoreapi.com/products")
            
            .then((res) => {
                let data = res.data
                setProdcuts(data)
                console.log(data)
        })
            
            .catch((err) => {
                console.log(err)
            })
    },[])
    return (
        <div className="col-12 " id="HomePage">
            <NavBar />
            <div className="col-12 container d-flex flex-wrap  gap-4 p-3 justify-content-center">
                {
                
                    prodcuts.map((el, index) => {
                        return (
                            <Products key={el.id} imgSrc={el.image} price={el.price } category={el.category} />
                      )

                  })
                }


            </div>
        </div>
    );
}

export default HomePage;




