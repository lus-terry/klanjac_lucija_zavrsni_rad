import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import {setHeaders, url} from "./api"
import {toast} from "react-toastify"


const initialState = {
    list: [], 
    status: null,
    error: null,
};

export const usersFetch = createAsyncThunk(
    "users/usersFetch",
        async() => {
            try{ 
                const response = await axios.get(`${url}/users`, setHeaders())
                return response?.data //ovaj upitnik znaci da ako data ne postoji vrati error
            }catch(error) {
                console.error(error)
            }
        }  
);

export const userDelete = createAsyncThunk(
    "users/userDelete",
        async(id) => {
            try{ 
                const response = await axios.delete(`${url}/users/${id}`, setHeaders())
                return response?.data //ovaj upitnik znaci da ako data ne postoji vrati error
            }catch(error) {
                console.error(error)
                toast.error("an error occured");
            }
        }  
);



const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(usersFetch.pending, (state, action) => {
                state.status = "pending";
                state.error = null;
            })
            .addCase(usersFetch.fulfilled, (state, action) => {
                state.status = "success";
                state.list = action.payload || [];
      
                state.error = null;
            })
            .addCase(usersFetch.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload;
            })
            .addCase(userDelete.pending, (state, action) => {
                state.deleteStatus = "pending";
                state.error = null;
            })
            .addCase(userDelete.fulfilled, (state, action) => {
                if (action.payload) {
                    const newList = state.list.filter((user) => user._id !== action.payload._id);
                    state.list = newList;
                    state.deleteStatus = "success";
                    state.error = null;
                    toast.error("User Deleted"); // Not an error but a red message
                } else {
                    state.deleteStatus = "rejected";
                    state.error = "Failed to delete user.";
                }
            })
            .addCase(userDelete.rejected, (state, action) => {
                state.deleteStatus = "rejected";
                state.error = action.payload;
                toast.error("An error occured")
            });
        },
    });
    
    export default usersSlice.reducer;

