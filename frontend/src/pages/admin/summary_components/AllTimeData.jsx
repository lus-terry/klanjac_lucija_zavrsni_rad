import { useSelector } from "react-redux";
import useSummaryData from "./useSummaryData";


const AllTimeData = () => {
    //products
    const {items} = useSelector(state => state.products);

    const { totalUsers, totalOrders, totalIncome } = useSummaryData();

  

    return (<>
        <h2>All time data</h2>
            <div className="transaction_container_div">
                <div className="w-1/2">USERS</div>
                <div className="w-1/2">{totalUsers}</div>
            </div>
            <div className="transaction_container_div">
                <div className="w-1/2">PRODUCTS</div>
                <div className="w-1/2">{items.length}</div>
            </div>
            <div className="transaction_container_div">
                <div className="w-1/2">ORDERS</div>
                <div className="w-1/2">{totalOrders}</div>
            </div>
            <div className="transaction_container_div">
                <div className="w-1/2">EARNINGS</div>
                <div className="w-1/2">{totalIncome}</div>
            </div>

    </>);
}
 
export default AllTimeData;