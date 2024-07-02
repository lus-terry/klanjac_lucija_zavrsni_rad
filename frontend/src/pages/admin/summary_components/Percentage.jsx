const Percentage = ({ data}) => {



    return ( 
        <>
        {data.percentage < 0 
        ?  <div className="percentage_div text-red-500">
            {Math.floor(data.percentage) + "%"}
        </div>
        : <div className="percentage_div text-green-500">
        {Math.floor(data.percentage) + "%"}
        </div> }
        </>
);
}
 
export default Percentage;