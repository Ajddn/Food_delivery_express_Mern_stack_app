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
    const apiUrl = 'https://food-delivery-express-mern-stack-app-git-main-ajddn.vercel.app/product';

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setDataProduct(data)); // Dispatch data to Redux store
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
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
