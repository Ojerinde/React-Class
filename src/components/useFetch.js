import { useCallback, useReducer } from "react";

// The state initial state
const initialState = {
  isLoding: false,
  error: {
    hasError: false,
    message: "",
  },
};

// The function triggered when the dispatchFn fro the useReducer is called
const fetchReducer = (state, action) => {
  if (action.type === "LOADING") {
    const updatedState = { ...state, isLoading: action.value };
    return updatedState;
  }
  if (action.type === "ERROR") {
    const updatedState = {
      ...state,
      error: action.value,
    };
    return updatedState;
  }
  return state;
};

// Cretaing a custom hook
const useFetch = () => {
  const [fetchState, dispatchFn] = useReducer(fetchReducer, initialState);

  // A fuction to close the error modal.
  const closeModal = () => {
    dispatchFn({ type: "ERROR", value: { hasError: false, message: "" } });
  };

  // The function to send the fetch request. is it expecting a configuration object as well as a function that will get the request transformed data
  const fetchRequest = useCallback(
    async (requestConfig, getData = () => {}) => {
      dispatchFn({ type: "LOADING", value: true });
      dispatchFn({ type: "ERROR", value: { hasError: false, message: "" } });
      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : "GET",
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
          headers: requestConfig.headers ? requestConfig.headers : {},
        });

        if (!response.ok) {
          throw new Error(`${requestConfig.errorMessage}`);
        }

        // Retrieving the body data
        const responseBody = await response.json();

        // Formatting the body data to what I need
        const transformedData = [];
        for (const student of responseBody.results) {
          transformedData.push({
            id: student.id.value,
            name: `${student.name.first} ${student.name.last}`,
            location: `${student.location.street.name} ${student.location.street.number}`,
            email: student.email,
            img: student.picture.medium,
            title: student.name.title,
            username: student.login.username,
            phone: student.phone,
            age: student.dob.age,
            date: student.dob.date,
            address: `${student.location.street.name} ${student.location.street.number}`,
            country: student.location.country,
            city: student.location.city,
            state: student.location.state,
          });
        }
        // Sending the data to the component that send the request
        getData(transformedData);
      } catch (err) {
        dispatchFn({
          type: "ERROR",
          value: { hasError: true, message: requestConfig.errorMessage },
        });
      }
      dispatchFn({ type: "LOADING", value: false });
    },
    []
  );

  // Destructuring the sate
  const { isLoading, error } = fetchState;
  // Data that can be gotten from this custom hook
  return { isLoading, error, closeModal, fetchRequest };
};
export default useFetch;
