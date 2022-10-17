import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../../components/loader'
import './account.scss'

export const Account = ({}) => {
    const dispatch = useDispatch()
    // const { loading } = useSelector(state => state.)

    useEffect(() => {
        dispatch()
    }, [])
        
    return <>
        {/* {loading ? <Loader/> : null} */}
        <div className="account">
            
        </div>
    </>
}