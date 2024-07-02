import { Button } from "semantic-ui-react";
import ProductCardHomePage from "../components/ProductCardHomePage";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import text from "../components/Text";

const  Home = () => {
  
    const {items: data, status} = useSelector((state) => state.products);
    const navigate = useNavigate();

    const handleNavigate = (link) => {
        navigate(link);
    };

    return (
    <div className="content_container">
         <div className="content_container_home normal_text">

            <div className="row_container items-center justify-center">
                
                <div  className="flex w-2/3" style={{height: '400px'}}>
                    
                    <div className="flex flex-col normal_text items-right justify-center text-left w-1/2 gap-2">
                        <h2>ABOUT US</h2>
                        <div>{text.aboutUsShort }</div>
                        <Button onClick={() => navigate("/aboutUs") } style={{width: '300px'}}>Find out more</Button>
                    </div>
                    <div className="flex w-1/2">
                        <img
                        className="h-full  object-cover"
                        src="https://res.cloudinary.com/lus-terry/image/upload/v1718206712/webShop/oexg7coljybpy2rfkwiv.jpg"
                        alt="aboutUs"
                        />
                    </div>
                
                </div>
                
            </div>

            <div className="row_container items-center justify-center">
                <h2>SHOP OUR WINES</h2>
                <div>
                {status === "success" ? (
                    <>
                    <div className="flex " > 
                        {data &&
                        data?.map(product => 
                        <ProductCardHomePage
                        key = {product._id}
                        product = {product}
                        />
                        )}
                    </div>
                    </>

                ) : status === "pending" ? (
                    <p>Loading...</p>
                ) : (
                    <p>Unexpected error occured...</p>
                )}
                </div>
                <Button style={{width: '20%'}} onClick={() => handleNavigate("/shop")} >SEARCH ALL WINES</Button>

            </div>
            <div className="row_container items-center justify-center">
                
                <div  className="flex w-2/3" style={{height: '400px'}}>
                    
                    <div className="flex w-1/2">
                        <img
                        className="h-full  object-cover"
                        src="https://res.cloudinary.com/lus-terry/image/upload/v1718207939/webShop/ohidyezbjcjf5emsbpxh.jpg"
                        alt="visitUs"
                        />
                    </div>
                    <div className="flex flex-col normal_text items-right text-left justify-center w-1/2 gap-2">
                        <h2>VISIT US</h2>
                        <div>{text.visitUs.split('\n').map((line, index) => <div key={index}>{line}</div>)}</div>
                      
                        <Button  onClick={() => navigate("/visit") } style={{width: '300px'}}>Find out more</Button>
                        
                    </div>
                    
                
                </div>
                
            </div>


       
    

        <div className="row_container">

        <div className=" flex flex-col gap-2 w-full  items-center p-5" style={{ borderTop: '1.5px solid '}}>
       
                  <h2>CONTACT</h2>
                  
                  <div className="text-left flex flex-col gap-2">
                    

                    <div>
                    
                        How to find us?
                        <br/>
                        <div className="text-center">
                        <a className="underline uppercase" href={text.googleMapsUrl} target="_self">
                        Otvori Google Maps
                        </a>
                        </div>
                    </div>

                    <div>
                    
                        insylvisvina@gmail.com
                    </div>

                    <div className="flex "> 
                        GSM:
                        <a href="tel:+385989475313">+385 98 9475 313</a> /{" "}
                        <a href="tel:+385998744262">+385 99 8744 262</a> 
                    </div>
                       
    
              </div>
     </div>
     </div>
     </div>
    </div>
    );
};
 
export default Home;