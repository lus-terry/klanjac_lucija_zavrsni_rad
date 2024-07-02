import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productsEdit } from '../../slices/productsSlice';
import { Button } from "semantic-ui-react";
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function FormDialog({prodId}) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const {items} = useSelector(state => state.products)
  const [currentProd, setCurrentProd] = useState({})
  const [previewImage, setPreviewImage] = useState("")
  const [productImg, setProductImg] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");


  const handleClickOpen = () => {
    setOpen(true);
    
    //returns array of one product
    let selectedProd = items.filter((item) => item._id === prodId)
    selectedProd = selectedProd[0]
    setCurrentProd(selectedProd)
    setPreviewImage(selectedProd.image?.url)
    setProductImg("")
    setName(selectedProd.name)
    setPrice(selectedProd.price)
    setShortDesc(selectedProd.shortDesc)
    setLongDesc(selectedProd.longDesc) 

  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleProductImageUpload = (e) =>{
      const file = e.target.files[0];
      TransformFile(file);
  };


  const TransformFile = (file) => {

      /*
      Base64 is a method for encoding binary data into ASCII text. 
      In the context of web development, 
      Base64 images refer to images that have been encoded as a Base64 string. 
      This string can be embedded directly into the HTML code 
      of a web page and displayed as an image, 
      without the need for separate image files.
      */
      const reader = new FileReader()

      if(file) {
          reader.readAsDataURL(file);
          //once its completed:
          reader.onloadend = () => {
              setProductImg(reader.result);
              setPreviewImage(reader.result);
          };
      } else {
          setProductImg("")
      }
  };

  const handleSubmit = (e) => {
      e.preventDefault()
      dispatch(
        productsEdit({
          productImg, //empty string or new selected image
          product: {
            ...currentProd, 
            name: name,
            price: price,
            shortDesc: shortDesc,
            longDesc: longDesc,
          }

      }))

      handleClose()
  }





  return (
    <React.Fragment  style={{ height: '750x', width: '1200px' }}>
      <div  onClick={handleClickOpen}>
        Edit 
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={"md"} 
        fullWidth={true}
     
      >
      <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <p className="p-4 text-center"style={{ fontSize: '24px' }} >Edit product </p>

        <DialogContent>

        <div className="row_container">
           

            <form className="flex flex-col w-full px-20  gap-5 "  onSubmit={handleSubmit}>

                <div className="flex w-full gap-10 ">
                
                    <div className="  flex flex-col items-left text-left pl-2 justify-center gap-2 w-1/2"  >
                    
                        <p>name:</p>
                        <input
                            className="input"
                            type="text"  
                            placeholder=""
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        
                        />
                        <p>price:</p>
                        <input
                            className="input"
                            type="number"  
                            placeholder="€  0.00"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        
                        />
                        <p>short description:</p>
                        <textarea
                            style={{ height: '100px', boxSizing: 'border-box'  }}
                            className="input" 
                            type="text" 
                            placeholder=""
                            value={shortDesc}
                            onChange={(e) => setShortDesc(e.target.value)}
                        
                        />
                        <p>long description:</p>
                        <textarea
                            style={{ height: '200px' }}
                            className="input" 
                            type="text" 
                            placeholder=""
                            value={longDesc}
                            onChange={(e) => setLongDesc(e.target.value)}
                        
                        />
                        
                        
             
                    </div>
                    <div className=" flex flex-col  gap-10 w-1/2 h-full" >
                        <div className='gap-2' >
                          <p>image:</p>
                              <label className="button" style={{  width: '100%' }}>
                                  <input
                                      type="file" 
                                      accept="image/*" 
                                      onChange={handleProductImageUpload}
                                      style={{ display: 'none' }}
        
                                  />
                                  Choose File
                              </label>
                        </div>

               
                        
                        <div className=" flex align-center justify-center border-gray-200 border-2 " style={{ height: '420px', width: '100%' }}>
                            {previewImage ? (
                            <div >
                                <img   src={previewImage} alt="product" className="w-full h-full object-cover" />
                            </div>
                            ) : (
                            <div  className=" justify-center items-center flex flex-col" >
                                Image preview will appear here
                            </div>
                            )}
                        </div>
                      </div>
    

                    
                </div>
               
            
                <div className=" text-center w-full">
                  <Button type="submit" >
                      Submit
                  </Button>
                  <Button onClick={handleClose}>
                    Cancel
                  </Button>
                </div>

            
        
        </form>

     </div>
    


        </DialogContent>
       
      </Dialog>
    </React.Fragment>
  );
}