import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addSubscription } from "../redux/slices/subscription.slice";
import toast from "react-hot-toast";
import { advertiseWithUs, sendMessage } from "../redux/slices/contact.slice";
import { validateEmail } from "../utils/emailValidation";

export const useContact = (isOpen) => {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    phoneNumber: "",
  });
  const ctaStateChangeHandler = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState({
    firstName: false,
    lastName: false,
    email: false,
    message: false,
  });
  const onErrorChange = (key, value) => {
    setError((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
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
    setError({
      firstName: false,
      lastName: false,
      email: false,
      message: false,
    });
    setErrorMessage("");
  }, [isOpen]);


  const contactHandler = () => {
    try {
      let hasError = false;

      if (!state.firstName.trim()) {
        onErrorChange("firstName", true);
        hasError = true;
      }
      if (!state.lastName.trim()) {
        onErrorChange("lastName", true);
        hasError = true;
      }
      if (!state.email.trim()) {
        onErrorChange("email", true);
        setErrorMessage("Please fill in all required fields.");
        hasError = true;
      } else if (!validateEmail(state.email)) {
        onErrorChange("email", true);
        setErrorMessage("Please enter a valid email address.");
        hasError = true;
      }
      if (!state.message.trim()) {
        onErrorChange("message", true);
        hasError = true;
      }
      if (hasError) {
        setLoading(false);
        setErrorMessage("Please fill in all required fields.");
        return;
      } else {
        setLoading(true);
        dispatch(
          sendMessage({
            payload: state,
            callback: (data) => {
              if (data?.status == 500) {
                setLoading(false);
                setError(data?.message);
              }
              if (data?.status == 200) {
                setLoading(false);
                toast.success(data?.message);
                setState({});
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


  const advertiseHandler = () => {
    try {
      let hasError = false;

      // Simple phone number regex (adjust pattern based on specific needs)
      const phoneRegex = /^[0-9]{10}$/;

      if (!state.firstName.trim()) {
        onErrorChange("firstName", true);
        hasError = true;
      }
      if (!state.lastName.trim()) {
        onErrorChange("lastName", true);
        hasError = true;
      }
      if (!state.phoneNumber.trim()) {
        onErrorChange("phoneNumber", true);
        setErrorMessage("Please fill in all required fields.");
        hasError = true;
      } else if (!phoneRegex.test(state.phoneNumber.trim())) {
        onErrorChange("phoneNumber", true);
        setErrorMessage("Please enter a valid phone number.");
        hasError = true;
      }
      if (!state.message.trim()) {
        onErrorChange("message", true);
        hasError = true;
      }
      if (hasError) {
        setLoading(false);
        setErrorMessage("Please fill in all required fields.");
        return;
      } else {
        setLoading(true);
        dispatch(
          advertiseWithUs({
            payload: state,
            callback: (data) => {
              if (data?.status == 500) {
                setLoading(false);
                setError(data?.message);
              }
              if (data?.status == 200) {
                setLoading(false);
                toast.success(data?.message);
                setState({
                  firstName: "",
                  lastName: "",
                  phoneNumber: "",
                  message: "",

                });
              }
            },
          })
        );
      }
    } catch (error) {
      setLoading(false);
      console.log("An Error Occurred");
    }
};
  return {
    state,
    contactHandler,
    loading,
    error,
    ctaStateChangeHandler,
    errorMessage,
    advertiseHandler,
    setErrorMessage,
    onErrorChange
  };
};
