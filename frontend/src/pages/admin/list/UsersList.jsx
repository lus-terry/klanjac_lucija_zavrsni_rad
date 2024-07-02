import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { userDelete, usersFetch } from '../../../slices/usersSlice';
import moment from 'moment';
import UserCardDialog from '../../../components/UserCardDialog';

export default function UsersList() {
  
  const dispatch = useDispatch()

  const {list} = useSelector((state) => state.users)

  React.useEffect(() => {
    dispatch(usersFetch());
  }, [dispatch]);

  console.log("list", list)

  const rows = list && list.map((user) => {
    return {
        id: user._id,
        uName: user.name, 
        uEmail: user.email,
        isAdmin: user.isAdmin,
        date: moment(user.createdAt).format('DD.MM.YYYY'),
    
    };
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'uName', headerName: 'Name', width: 150},
    { field: 'uEmail', headerName: 'Email', width: 200 },
    { field: 'isAdmin', headerName: 'Role', width: 100,
        renderCell: (params) => {
            return (
            <div>
            {params.row.isAdmin ? (<div>Admin</div>) : (<div>Customer</div>)}
            </div>
            );
        }
     },
    { field: 'date', headerName: 'Date', width: 120 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 120,
      renderCell: (params) => {
        return ( 
            <div className='actionsContainerList'>
            <button 
            className='text-red-500 hover:text-red-700'
            onClick={() => handleDelete(params.row.id)}>
              Delete
            </button>
            
          
            <button className='text-green-500 hover:text-green-700'>
            <UserCardDialog  userId={params.row.id}/>
            </button>
        </div> )
    } },
  ];

  const handleDelete = (id) => {
    dispatch(userDelete(id))
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
