import { useState, useEffect } from 'react';
import axios from 'axios';
import { url, setHeaders } from '../../../slices/api';
import { useParams } from 'react-router-dom';

const useSummaryData = () => {
  const params = useParams();

  const [usersMonth, setUsersMonth] = useState([]);
  const [usersPercMonth, setUsersPercMonth] = useState(0);

  const [ordersMonth, setOrdersMonth] = useState([]);
  const [ordersPercMonth, setOrdersPercMonth] = useState(0);

  const [incomeMonth, setIncomeMonth] = useState([]);
  const [incomePercMonth, setIncomePercMonth] = useState(0);

  const [sales, setSales] = useState([])
  const [loadingChart, setLoadingChart] = useState(false)

  const [totalUsers, setTotalUsers] = useState(0);

  const [orders, setOrders] = useState([])
  const [loadingTransactions, setloadingTransactions] = useState(false)

  const [totalOrders, setTotalOrders] = useState(0);

  const [totalIncome, setTotalIncome] = useState(0);

  const [product, setProduct] = useState({})
  const [loadingProduct, setLoadingProduct] = useState(false)

  const compare2 = (a, b) => {
    if (a._id > b._id) {
      return 1;
    }
    if (a._id < b._id) {
      return -1;
    }
    return 0;
  };

  const compare = (a, b) => {
    if (a._id < b._id) {
      return 1;
    }
    if (a._id > b._id) {
      return -1;
    }
    return 0;
  };

  useEffect(() => {
    const fetchMonthlyUsers  = async () => {
      try {
        const res = await axios.get(`${url}/users/stats`, setHeaders());
        res.data.sort(compare);

        setUsersMonth(res.data);
        setUsersPercMonth(
          //((res.data[0].total - res.data[1].total) / res.data[1].total) * 100
          ((res.data[1].total *100) / res.data[0].total)
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchMonthlyUsers ();
  }, []);

  useEffect(() => {
    const fetchMonthlyOrders  = async () => {
      try {
        const res = await axios.get(`${url}/orders/stats`, setHeaders());
        res.data.sort(compare);

        setOrdersMonth(res.data);
        setOrdersPercMonth(
          //((res.data[0].total - res.data[1].total) / res.data[1].total) * 100
          ((res.data[1].total *100) / res.data[0].total)
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchMonthlyOrders ();
  }, []);

  useEffect(() => {
    const fetchMonthlyIncome = async () => {
      try {
        const res = await axios.get(`${url}/orders/income/stats`, setHeaders());
        res.data.sort(compare);

        setIncomeMonth(res.data);
        setIncomePercMonth(
          ((res.data[0].total - res.data[1].total) / res.data[1].total) * 100
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchMonthlyIncome();
  }, []);

  useEffect(() => {
    async function fetchChartData() {
        setLoadingChart(true)
        try{
            const res = await axios.get(`${url}/orders/week-sales`, setHeaders());
            res.data.sort(compare2)

            const newData = res.data.map((item) => {
                const DAYS = [
                    "Sun",
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thur",
                    "Fri",
                    "Sat",
                ]
                return {
                    day: DAYS[item._id-1],
                    amount: item.total / 100
                }
            })
            setSales(newData)
            setLoadingChart(false)
        }catch(err){
            console.log(err)
            setLoadingChart(false)
        }
    }
    fetchChartData();
}, []);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const res = await axios.get(`${url}/users`, setHeaders());
        setTotalUsers(res.data.length);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTotalUsers();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
        setloadingTransactions(true);
      try {
        const res = await axios.get(`${url}/orders/?new=true`, setHeaders());
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
      setloadingTransactions(false);
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchTotalOrders = async () => {
        setloadingTransactions(true);
      try {
        const res = await axios.get(`${url}/orders/?new=false`, setHeaders());
        setTotalOrders(res.data.length);
      } catch (err) {
        console.log(err);
      }
      setloadingTransactions(false);
    };
    fetchTotalOrders();
  }, []);

  useEffect(() => {
    const fetchTotalIncome = async () => {
      try {
        const res = await axios.get(`${url}/orders/total-sales`, setHeaders());
        
        setTotalIncome(res.data.totalSales / 100);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTotalIncome();
  }, []);

  useEffect(() => {
    setLoadingProduct(true);
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${url}/products/find/${params.id}`, setHeaders());
       
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
      setLoadingProduct(false)
    };
    fetchProduct();
  }, [params.id]);


  return { 
    usersMonth, 
    usersPercMonth, 
    ordersMonth, 
    ordersPercMonth, 
    incomeMonth, 
    incomePercMonth, 
    sales,
    loadingChart,
    totalUsers,
    orders,
    loadingTransactions,
    totalOrders,
    totalIncome,
    product,
    loadingProduct,
  };
};

export default useSummaryData;
