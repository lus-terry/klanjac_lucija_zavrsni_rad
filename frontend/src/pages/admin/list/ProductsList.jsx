import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { productsDelete } from '../../../slices/productsSlice';
import EditProduct from '../EditProduct';
import ProductCardDialog from '../../../components/ProductCardDialog';

export default function ProductsList() {
  

  const dispatch = useDispatch()

  const {items} = useSelector((state) => state.products)

  const rows = items && items.map(item => {
    return {
        id: item._id,
        imageUrl: item.image.url,
        pName: item.name,
        pDescShort: item.shortDesc,
        pDescLong: item.longDesc,
        pPrice: item.price.toLocaleString(),
    }
  })

  const columns = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'imageUrl', headerName: 'Image', width: 80, 
    renderCell: (params) => {
        return ( 
        <div className='imageContainerList'>
            <img src={params.row.imageUrl} alt="product"/>
        </div> )
    } },
    { field: 'pName', headerName: 'Name', width: 130 },
    { field: 'pDescShort', headerName: 'Short Description', width: 200 },
    { field: 'pDescLong', headerName: 'Long Description', width: 400 },
    { field: 'pPrice', headerName: 'Price', width: 80 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 170,
      renderCell: (params) => {
        return ( 
        <div className='actionsContainerList'>
            <button 
            className='text-red-500 hover:text-red-700'
            onClick={() => handleDelete(params.row.id)}>
              Delete
            </button>
            <button className='text-orange-500 hover:text-orange-700'>
            <EditProduct prodId={params.row.id}/>
            </button>
          
            <button className='text-green-500 hover:text-green-700'>
            <ProductCardDialog  prodId={params.row.id}/>
            </button>
        </div> )
    } },
  ];

  const handleDelete = (id) => {
    console.log("deleting id:", id)
    dispatch(productsDelete(id));
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
