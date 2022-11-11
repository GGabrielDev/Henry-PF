import { Request, Response, Router, NextFunction } from "express";
import Stripe from "stripe"
import express from "express"



const router = Router();


const stripe = new Stripe("sk_test_51LbWG6CISvGskgcJWw3mTxLHdWlC36HHeP9Ui7m5idZ41jf68tbZcNf0RwxlLsBqWgVq4oTsNw5gPBpsYi4gArZg00Yuj9nmcg",{apiVersion: "2022-08-01"})

router.post("/api/checkout", async (req,res)=>{

    try {
        const {id,amount}=req.body
        const payment = await stripe.paymentIntents.create({
            amount,
            currency:"USD",
            description:"Premium pack",
            payment_method: id,
            confirm: true,
        })
        console.log(payment)
        res.send({message: "Succes"})
        
    } catch (error) {
        console.log(error)
        res.json({message:error})
    }
})

export default router;