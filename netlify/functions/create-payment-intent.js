require("dotenv").config();

const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

// using async await function bacause need to recieve data from stripe to make request payment
exports.handler = async (event) => {
  try {
    const { amount } = JSON.parse(event.body);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    // after the paymentIntent function done 
    return {
        statusCode: 200,
        body: JSON.stringify({ paymentIntent  })
    }
  } catch (error) {
    // if error 
    console.log({ error });

    // send data to front-end side 
    return {
        status: 400,
        body: JSON.stringify({ error })
    }
  }
};
