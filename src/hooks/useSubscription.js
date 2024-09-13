import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addSubscription } from "../redux/slices/subscription.slice";
import toast from "react-hot-toast";
import { validateEmail } from "../utils/emailValidation";

export const useSubscription = (isOpen) => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [consent, setConsent] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);
  useEffect(() => {
    setError("");
  }, [isOpen]);
  const subscribeHandler = () => {
    try {
      if (!email && !phone) {
        setError("Please enter your email address or phone number");
        return false;
      }
      if (!consent) {
        setError("Please mark consent");
        return false;
      } else {
        setLoading(true);
        dispatch(
          addSubscription({
            payload: { phoneNumber: phone, email, consent },
            callback: (data) => {
              if (data?.message == "Already Subscribed") {
                setError(data?.message);
              }
              if (data.data) {
                setPhone("");
                setEmail("");
                setLoading(false);
                toast.success("Subscribed Successfully");
              }
            },
          })
        );
      }
    } catch (error) {
      setLoading(false);
      console.log("An Error Occured");
    }
  };
  return {
    phone,
    setPhone,
    subscribeHandler,
    loading,
    error,
    email,
    setEmail,
    setError,
    consent,
    setConsent,
  };
};
