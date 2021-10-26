import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import swal from "sweetalert";
import { useSelector } from "react-redux";

import "./Stripe.css";

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const { amount } = useSelector((state) => {
    return {
      amount: state.stripeReducer,
    };
  });

  const handleSubmit = async (data) => {
    data.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log("token created", paymentMethod.card.brand);
      try {
        const { id } = paymentMethod;
        await axios
          .post("http://localhost:5000/pay", {
            amount: amount, //value of amount take from setAmount in axios bids
            id: id,
          })
          .then((result) => {
            console.log(result.data.data_payment);
            axios.post("http://localhost:5000/payments", {
              payment_type: paymentMethod.card.brand,
            });
            swal("Payment Success");
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log("error :", error);
        swal("Payment Failed ,please check the expire of card");
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      <main id="main">
        <section id="left">
          <div id="head">
            {/* <h1>Life has great moments</h1> */}
            <p>Enjoy them with auctions!</p>
          </div>
          <h3>Only {amount}$</h3>
        </section>
        <section id="right">
          <p>Payment</p>

          <form action="#">
            <div id="form-card" class="form-field">
              <label for="email">Email</label>
              <input id="email" required />
            </div>
            <div id="form-sec-code" class="form-field">
              <label for="sec-code">Your Name</label>
              <input type="text" maxlength="20" required />
            </div>
          </form>
          <form onSubmit={handleSubmit}>
            <CardElement />

            {/*using use state to add the value of amount fron axios bids*/}
            <button id="submit">Pay</button>
          </form>
        </section>
      </main>
    </>
  );
};
