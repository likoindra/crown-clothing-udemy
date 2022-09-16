import { FormEvent, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { BUTTON_TYPE_CLASSES } from "../button/";
import { FormContainer, PaymentFormContainer,PaymentButton } from "./payment-form.styles";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";


// typeguard using tyepscript
// if it true it will make the card as `StripeCardElement` 
// if card not equal to null that must be `StripeCardElement`
const ifValidCardElement = (card: StripeCardElement | null): card is StripeCardElement => card !== null;

const PaymentForm = () => {
  // hooks from react-stripe-js
  const stripe = useStripe();
  const elements = useElements();

  // loading state process payment method
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // amount payment
  const amount = useSelector(selectCartTotal);

  // take the current user
  const currentUser = useSelector(selectCurrentUser);


  // payment handler submit function
  // make it async await because need to recieve data from stripe
  const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // check the stripe instance
    // if there's no 2 of them , exit the payment process
    // if condition meet, run the stripe payment
    if (!stripe || !elements) {
      return;
    }

    // before fetching the process payment
    // make processingPayment to true
    setIsProcessingPayment(true);

    // fetching to server to make payment request
    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      // total amount must be * by 1000
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json());
    // console.log(response, 'payment data')

    // take the secret_key from response
    const {
      paymentIntent: { client_secret },
    } = response;

    // console.log(client_secret)

    // PaymentResult type 
    const cardDetails = elements.getElement(CardElement);

    // check if cardDetails present or not 
    // if cardDetails null , dont continue the proccess
    // if(cardDetails === null) return;

    // second type of using `ifValidCardComponent` typeguard from typescript 
    if(!ifValidCardElement(cardDetails)) return;

    // make the actual payment
    // need client_secret to grant access to payment
    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: cardDetails,
        billing_details: {
          name: currentUser ? currentUser?.displayName : "Guest",
        },
      },
    });

    // check the condition if there's error or not
    if (paymentResult.error) {
      alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment Successful");
        setIsProcessingPayment(false);
      }
    }
  };
  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit card payment :</h2>
        <CardElement />
        {/* disabling button when processing payment is true */}
        <PaymentButton
          isLoading={isProcessingPayment}
          buttonType={BUTTON_TYPE_CLASSES.inverted}
        >
          Pay Now
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
