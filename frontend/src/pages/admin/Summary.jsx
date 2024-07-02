import {FaUsers, FaChartBar, FaClipboard} from "react-icons/fa"
import Widget from "./summary_components/Widget";
import Chart from "./summary_components/Chart";
import Transactions from "./summary_components/Transactions";
import AllTimeData from "./summary_components/AllTimeData";
import useSummaryData from "./summary_components/useSummaryData";

/*
2 problema
1) kad je u pitaju 1. jesec 1-1 mora bit 12
2) kad u mjesecu nea ordera/usera on vuče prethodni 
*/

const Summary = () => {

    const { usersMonth, usersPercMonth, ordersMonth, ordersPercMonth, incomeMonth, incomePercMonth } = useSummaryData();

    const data = [ 
    {
        icon: <FaUsers/>,
        digits: usersMonth[0]?.total,
        isMoney: false, 
        title: "Users",
        color: "rgb(102, 108, 255)",
        bgColor: "rgb(102, 108, 255, 0.12)",
        percentage: usersPercMonth,
    },
    {
        icon: <FaClipboard/>,
        digits: ordersMonth[0]?.total,
        isMoney: false, 
        title: "Orders",
        color: "rgb(253, 181, 40)",
        bgColor: "rgb(253, 181, 40, 0.12)",
        percentage: ordersPercMonth,
    },
    {
        icon: <FaChartBar/>,
        digits: incomeMonth[0]?.total ? incomeMonth[0]?.total/100 : "",
        isMoney: true, 
        title: "Earnings",
        color: "rgb(38, 198, 249)",
        bgColor: "rgb(38, 198, 249, 0.12)",
        percentage: incomePercMonth,
    },
]

    return ( 
        <div className="flex justify-center gap-8">
            <div className="flex flex-col gap-8">
                <div className="admin_overview ">
                    <h2 className="p-0">Overview</h2>
                    How your shop is performing compared to the previous month.
                    <div className="flex flex-row gap-7">
                        {data?.map((data, index) => (<Widget key={index} data={data}/>))}
                    </div>
                </div>
                <div className="admin_chart">
                <h2 className="p-0 top-0">Last 7 days earnings (€)</h2>
                    <Chart/>
                </div>  
            </div>
            <div className="flex flex-col gap-8">
                <div className="admin_transactions">
                    <Transactions/>
                </div>
                <div className="admin_transactions">
                    <AllTimeData/>
                </div>
            </div>
                    
            
        </div> 
    );
}
 
export default Summary;