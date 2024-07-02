import useSummaryData from "./useSummaryData";
const moment = require("moment");

const Transactions = () => {

    const { orders, loadingTransactions } = useSummaryData();

    return ( 
        <>
        {
            loadingTransactions ? (
                <div>Loading transactions...</div> 
             ) : (
                <>
                <h2>Latest Transactions</h2>
                {
                    orders?.map((order, index) => 
                    <div className="transaction_container_div">
                        <div className="w-1/3">{order.shipping.firstName}</div>
                        <div className="w-1/3">€{(order.total/100).toLocaleString()}</div>
                        <div className="w-1/3">{moment(order.createdAt).fromNow()}</div>
                    </div>)
                }
                </>
             )}
        </>
     );
}
 
export default Transactions;