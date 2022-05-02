const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Room = require("../models/room");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51KtImzJeN88cqIB7B56hKDviIBXzYGpVcolm26mcoFZvRdecMOjdCORUh3wPQZ3NfBi9w1Eh6fZ4tQoPaQn6xYmE007opXv6Lw"
);

router.post("/bookroom", async (req, res) => {
  console.log("req:", req.body);
  const { room, userid, fromdate, todate, totalamount, totaldays, token } =
    req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const payment = await stripe.charges.create(
      {
        amount: totalamount * 100,
        customer: customer.id,
        currency: "INR",
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4,
      }
    );
    res.send("Payment Successful, Your Room is Booked");
    if (payment) {
      const newbooking = new Booking({
        room: room.name,
        roomid: room._id,
        userid,
        fromdate: moment(fromdate).format("DD-MM-YYYY"),
        todate: moment(todate).format("DD-MM-YYYY"),
        totalamount,
        totaldays,
        transactionId: "1234",
      });
      const booking = await newbooking.save();
      const roomtemp = await Room.findOne({ _id: room._id });
      roomtemp.currentbookings.push({
        bookingid: booking._id,
        fromdate: moment(fromdate).format("DD-MM-YYYY"),
        todate: moment(todate).format("DD-MM-YYYY"),
        userid: userid,
        status: booking.status,
      });
      await roomtemp.save();
    }
    res.send("Payment Successfull, Your Room is Booked");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/getbookingsbyuserid", async (req, res) => {
  const userid = await req.body.userid;
  try {
    const bookings = await Booking.find({ userid: userid });
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/cancelbooking",async (req,res)=>{
  const{bookingid,roomid}=req.body
  try{
    const bookingitem=await Booking.findOne({_id:bookingid})
    bookingitem.status='cancelled'
    await bookingitem.save()
    const room=await Room.findOne({_id:roomid})
    const bookings=room.currentbookings
    const temp =bookings.filter(booking=>booking.bookingid.toString()!==bookingid)
    room.currentbookings=temp
    await room.save()
    res.send('Your booking cancelled sucessfully')
  }
  catch(error){
    return res.status(400).json({error});

  }
})

router.get("/getallbookings",async(req,res)=>{
  try {
    const bookings=await Booking.find()
    res.send(bookings)
  } catch (error) {
  
    return res.status(400).json({error});
  }
    
  
});

module.exports = router;
