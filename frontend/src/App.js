import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDataProduct } from "./redux/productSlice";

function App() {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product);
  // useEffect(() => {

  //   (async () => {
  //     const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/product`);
  //     const resData = await res.json();
  //     dispatch(setDataProduct(resData));
  //   })();
  // }, [dispatch]);
useEffect(() => {
    (async () => {
      try {
       const res = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/product`,
          {
            method: 'GET',
            credentials: 'include',
            mode: 'cors', // Add this line
          }
        );
        if (!res.ok) {
          throw new Error("Network response was not ok.");
        }
        const resData = await res.json();
        console.log(resData); // Log the parsed JSON data
        dispatch(setDataProduct(resData));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, [dispatch]);


  console.log(productData);
  return (
    <>
      <Toaster />
      <div>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
