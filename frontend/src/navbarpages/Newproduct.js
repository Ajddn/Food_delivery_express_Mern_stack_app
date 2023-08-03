import React, { useState } from "react";
import "./newproduct.css";
import { BsCloudUpload } from "react-icons/bs";
import { ImagetoBase64 } from "../utility/ImagetBase64";
import { toast } from "react-hot-toast";
import Footer from "../components/Footer";
// import { newproductbackg } from "../assests";
const Newproduct = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: "",
  });
  const handleOnchange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const Handlesubmit = async (e) => {
    e.preventDefault();
    // console.log(data);
    const { name, image, category, price } = data;
    if (name && image && category && price) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/uploadproduct`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const dataRes = await fetchData.json();
      setData(() => {
        return {
          name: "",
          category: "",
          image: "",
          price: "",
          description: "",
        };
      });
      console.log(dataRes);
      toast(dataRes.message);
    } else {
      toast("Enter required fields");
    }
  };
  const uplodImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    // console.log(data);
    setData((prev) => {
      return {
        ...prev,
        image: data,
      };
    });
  };
  // const uplodImage = async (e) => {
  //   const file = e.target.files[0];
  //   const imageBase64 = await ImagetoBase64(file);

  //   setData((prev) => ({
  //     ...prev,
  //     image: imageBase64,
  //   }));
  // };

  return (
    <div className="outermost">
      <div className="image-container">
        {/* <img
          className="imageback"
          src={newproductbackg}
          alt="backgroundimage"
          // height={40}
          // width={40}
        /> */}

        <form className="form-container">
          <div>
            <h1 className="headingadd"> Add an item </h1>
            <label className="labelone">Enter name of dish</label>
            <input
              className="enterdish"
              type="text"
              name="name"
              onChange={handleOnchange}
              value={data.name}
            ></input>
            <label className="labeltwo">Select the category</label>
            <select
              className="selectcat"
              name="category"
              onChange={handleOnchange}
              value={data.category}
            >
              <option value={"other"}>select category</option>
              <option value={"fruits"}>Fruits</option>
              <option value={"vegetable"}>Vegetable</option>
              <option value={"icream"}>Icream</option>
              <option value={"dosa"}>Dosa</option>
              <option value={"pizza"}>Pizza</option>
              <option value={"beverage"}>beverage</option>
              <option value={"sweet"}>sweet</option>
              <option value={"starter"}>starter</option>
              <option value={"Main course"}>Main course</option>
              <option value={"Briyani"}>rice</option>
              <option value={"chicken"}>chicken</option>
              <option value={"cake"}>Cake</option>
              <option value={"burger"}>Burger</option>
              <option value={"panner"}>Panner</option>
              <option value={"sandwich"}>Sandwich</option>
            </select>
            <label className="imagelabel" htmlFor="image">
              Image
              <div className="insideimg">
                <input
                  type={"file"}
                  accept="image/*"
                  id="image"
                  className="hidden"
                  onChange={uplodImage}
                />
                {data.image ? (
                  <img className="uploadedimg" src={data.image} alt="" />
                ) : (
                  <span>
                    <BsCloudUpload size={30} />
                  </span>
                )}
              </div>
            </label>
            <label className="pricelabel" htmlFor="price">
              Price
            </label>
            <input
              className="priceinput"
              type={"text"}
              name="price"
              onChange={handleOnchange}
              value={data.price}
            />

            <label className="labeldesc" htmlFor="description">
              Description
            </label>
            <textarea
              className="desc"
              rows={3}
              cols={29}
              name="description"
              onChange={handleOnchange}
              value={data.description}
            ></textarea>
            <button
              className="btn btn-primary buttonone"
              onClick={Handlesubmit}
            >
              Save
            </button>
            <button className="btn btn-danger buttontwo">
              <a href="/">Exit</a>
            </button>
          </div>
        </form>
      </div>
      <Footer  className= "footerclass"/>
    </div>
  );
};

export default Newproduct;
