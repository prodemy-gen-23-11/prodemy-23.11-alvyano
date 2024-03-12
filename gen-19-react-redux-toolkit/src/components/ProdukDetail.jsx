import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useSWR from "swr";
import { addBarangToCart } from "../store/reducers/Slice";
import Button from "./Button";


function ProdukDetail(props) {

    const { id } = props;
    const fetcher = (url) => axios.get(url).then((res) => res.data);
    const { data: mainData, isLoading } = useSWR(`http://localhost:3000/products/${id}`, fetcher);

    const dispatch = useDispatch();

    const [image, setImage] = useState(mainData?.gambar[0]);
    function setMainImage(newImage) {
        setImage(newImage);
    }

    useEffect(() => {
        setImage(mainData?.gambar[0]);
    }, [mainData]);


    const handleClickAddToCart = () => {
        const addBarang = { ...mainData, qty: 1 };
        dispatch(addBarangToCart(addBarang));
    }

    return isLoading ? (
        ""
    ) : (
        <div className='flex min-h-screen gap-x-10 flex-cols-2 px-20 py-32'>
          <div className='w-full flex flex-cols-2 gap-x-3'>
            <div className='w-2/3'>
              <img src={image} alt="" className='rounded-xl w-full h-auto' />
            </div>
            <div className='w-1/3 grid gap-y-12'>
              {mainData?.gambar.map((g, index) => (
                <img key={index} src={g} alt="" onClick={() => setMainImage(g)} className='rounded-xl active:scale-95 w-full h-20 object-cover cursor-pointer' />
              ))}
            </div>
          </div>
          <div className='w-1/2 px-3'>
            <div className='text-3xl text-amber-600 font-bold'>
              {mainData?.nama}
            </div>
            <div className='py-5 mt-5 text-left text-3xl'>
              Rp.{mainData?.harga}
            </div>
            <div className='mt-5 text-justify text-lg max-h-52'>
              {mainData?.deskripsi}
            </div>
            <div className='flex px-10 mt-20 gap-x-10'>
            <Button onClick={() => handleClickAddToCart()} className="bg-white hover:bg-amber-600 text-black hover:text-white hover:border-gray-800">
                Add To Whistlist
              </Button>
              <Button className="bg-white hover:bg-amber-600 text-black hover:text-white hover:border-gray-800">
                Add To Cart
              </Button>
            </div>
          </div>
        </div>
      );
}

export default ProdukDetail;
