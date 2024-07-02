import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { ordersEdit, ordersFetch } from '../../../slices/ordersSlice';
import moment from 'moment';
import OrderCardDialog from '../../../components/OrderCardDialog';

export default function OrdersList() {
  
  const dispatch = useDispatch()

  const {list} = useSelector((state) => state.orders)

  React.useEffect(() => {
    dispatch(ordersFetch());
  }, [dispatch]);

  const rows = list && list.map((order) => {
    return {
        id: order._id,
        cName: order.shipping.firstName, 
        amount: (order.total/100)?.toLocaleString(),
        dStatus: order.delivery_status,
        date:moment(order.createdAt).fromNow(),
    }
  })

  const columns = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'cName', headerName: 'Name', width: 120},
    { field: 'amount', headerName: 'Amount(€)', width: 100 },
    { field: 'dStatus', headerName: 'Status', width: 100,
        renderCell: (params) => {
            return (
            <div>
            {params.row.dStatus === "pending" ? (<div> Pending </div>)
            : params.row.dStatus === "dispatched" ? (<div> Dispatched </div>) 
            : params.row.dStatus === "delivered" ? (<div> Delivered </div>) 
            : ("error")
            }
            </div>
            );
        }
     },
    { field: 'date', headerName: 'Date', width: 120 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 220,
      renderCell: (params) => {
        return ( 
            <div className='actionsContainerList'>
            <button onClick={() => handleOrderDispatch(params.row.id)}
            className='text-red-500 hover:text-red-700'>
              Dispatch
            </button>
            <button onClick={() => handleOrderDeliver(params.row.id)}
            className='text-orange-500 hover:text-orange-700'>
            Deliver
            </button>
          
            <button className='text-green-500 hover:text-green-700'>
            <OrderCardDialog  orderId={params.row.id}/>
            </button>
        </div> )
    } },
  ];

  const handleOrderDispatch =(id)=> {
    dispatch(ordersEdit({
        id,
        delivery_status: "dispatched",
    }))
  }

  const handleOrderDeliver =(id)=> {
    dispatch(ordersEdit({
        id,
        delivery_status: "delivered",
    }))
  }




  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
       
      />
    </div>
  );
}
