import { useState } from "react"

export function useOpenModal(){

    const [openModal,setOpenModal]=useState(false)
    const handleOpenModal=()=>{
        setOpenModal(!openModal)
    }

    return{
        openModal,
        handleOpenModal
    }
  
}