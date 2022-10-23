import { Routes, Route, useNavigate } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";

import { ErrorBoundary } from "react-error-boundary";

import "./App.css";

import Header from "./components/Header";
import useFetch from "./components/useFetch";

const Home = lazy(() => import("./components/Home"));
const BooksHome = lazy(() => import("./components/Books/BooksHome"));
const UsersHome = lazy(() => import("./components/Users/UsersHome"));
const Users = lazy(() => import("./components/Users/Users"));
const UserDetails = lazy(() => import("./components/Users/UserDetails"));

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div>
      <p>{error.message}</p>
      <button onClick={() => resetErrorBoundary}>Reset App</button>
    </div>
  );
};

const App = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const { isLoading, error, fetchRequest } = useFetch();

  useEffect(() => {
    const getData = (data) => {
      setData(data);
    };

    fetchRequest(
      {
        url: "https://randomuser.me/api/1.4/?results=50",
      },
      getData
    );
  }, [fetchRequest]);

  return (
    <div className="app">
      <Header />
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => navigate("/")}
      >
        <Suspense fallback={<div>Loading</div>}>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/books/*" element={<BooksHome />} />

            <Route path="/users" element={<UsersHome />}>
              <Route
                path=""
                element={<Users users={data} isLoading={isLoading} />}
              />
              {/* /users */}
              <Route path=":id" element={<UserDetails users={data} />} />
              {/* /users/anything */}
            </Route>

            <Route path="*" element={<div className="error">Error Page</div>} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
export default App;

// useEffect(() => {
//   const fetchRequest = (async () => {
//     setLoading(true);
//     setError({ hasError: false, message: "" });

//     const response = await fetch("https://randomuser.me/api/1.4/?results=50");

//     // Whenever the request is not successfully, throw an error.
//     if (!response.ok) {
//       setError({ hasError: true, error: "Something went wrong" });
//       throw new Error("Something went wrong");
//     }

//     const responseBody = await response.json();

//     const transformedData = [];

//     for (const user of responseBody.results) {
//       transformedData.push({
//         id: user.login.uuid,
//         name: `${user.name.first} ${user.name.last}`,
//         email: user.email,
//         phone: user.phone,
//         picture: user.picture.medium,
//       });
//     }
//     // responseBody.results.map((user) => {
//     //   transformedData.push({
//     //     id: user.login.uuid,
//     //     name: `${user.name.first} ${user.name.last}`,
//     //     email: user.email,
//     //     phone: user.phone,
//     //     picture: user.picture.medium,
//     //   });
//     // });
//     setData(transformedData);
//     setLoading(false);
//   }, []);
//   fetchRequest().catch((error) =>
//     setError({ hasError: true, error: "Something went wrong" })
//   );
// }, []);
