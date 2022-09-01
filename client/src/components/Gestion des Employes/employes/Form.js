import React, { useContext, useEffect, useState } from "react";
import { createRef } from "react";
import { useForm } from "react-hook-form";
import { getCategories } from "../../../service/categoryAPI";
import { eventContext } from "../../../store/event-context";
export default function AddEventForm() {
  const eventsCtx = useContext(eventContext);
  const [category, setcategory] = useState([]);
  // const [Poster, setPoster] = useState(null);
  useEffect(() => {
    getCategories().then((res) => {
      setcategory(res?.data);
      // console.log(res?.data);
    });
  }, []);
  const fileInput = createRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onEventSubmit = (data) => {
    // console.log(data);
    // console.log(typeof data);
    // console.log('fileInput', fileInput)
    // console.log({...data,'PosterEvent':fileInput.current.files[0].name});
    const fd = new FormData();
    for (var key in data) {
      fd.append(key, data[key]); // formdata doesn't take objects
    }
    fd.append("PosterEvent", fileInput.current.files[0]);
    eventsCtx.createEvent(fd);
    console.log("allEvetns", eventsCtx.eventsTab);
  };
  return (
    <form
      className="row g-3 "
      method="post"
      onSubmit={handleSubmit(onEventSubmit)}
      // encType="multipart/form-data"
    >
      <input name="PosterEvent" type="file" accept="image/*" ref={fileInput} />
      <div className="col-md-4">
        <label htmlFor="validationCustom01" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          name="Title"
          {...register("Title", { required: true })}
          // required
        />
        <div className="valid-feedback">Looks good!</div>
      </div>
      <div className="col-md-4">
        <label htmlFor="validationCustom02" className="form-label">
          Date Event
        </label>
        <input
          type="date"
          className="form-control"
          name="DateEvent"
          {...register("DateEvent")}
          required
        />
        <div className="valid-feedback">Looks good!</div>
      </div>
      <div className="col-md-6">
        <label htmlFor="validationCustom03" className="form-label">
          Location
        </label>
        <input
          type="text"
          className="form-control"
          name="AdresseEvent"
          {...register("AdresseEvent", { required: true })}
          required
        />
        <div className="invalid-feedback">Please provide a valid Adress.</div>
      </div>
      <div className="col-md-3">
        <label htmlFor="validationCustom04" className="form-label">
          Category
        </label>
        <select className="form-select" required {...register("CategoryEvent")}>
          <option className="bg-light" value={""}>
            {/* <strong>Choose...</strong> */}
            Choose...
          </option>
          {category?.map((items, keys) => (
            // <option key={keys} value={items._id}>
            <option key={keys} value={items.CategoryEvent}>
              {items.CategoryEvent}
            </option>
          ))}
        </select>
        <div className="invalid-feedback">Please select a valid Category.</div>
      </div>
      <div className="col-md-3">
        <label htmlFor="validationCustomUsername" className="form-label">
          Duration
        </label>
        <div className="input-group" aria-placeholder="2h">
          <input
            type="number"
            className="form-control"
            id="validationCustomUsername"
            aria-describedby="inputGroupPrepend"
            required
            {...register("Duration", { required: true })}
          />
          <div className="invalid-feedback">Please choose a Duration.</div>
        </div>
      </div>
      <div className="col-12">
        <div className="mb-3">
          <label htmlFor="Description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            rows={3}
            name="Description"
            {...register("Description", { required: true, maxLength: 1000 })}
          />
        </div>
      </div>
      {/* <div>
      <FileBase
        type="file"
        onDone={({ base64 }) => setPoster({PosterEvent: base64 })}
      ></FileBase>
    </div> */}
      <button type="submit" className="btn btn-dark btnDash rounded-1 col-3">
        {" "}
        submit
      </button>
    </form>
  );
}