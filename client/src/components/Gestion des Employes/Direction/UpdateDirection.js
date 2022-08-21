import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { directionCtx } from "../../../store/directionContext";
import editPhoto from "../../../assets/images/pen.gif";
export default function UpdateDirection() {
  let ctx = useContext(directionCtx);
  let { _id } = useParams();
  let navigate = useNavigate();
  let selectedDirection = ctx.getDirectionById(_id);
  const [direction, setDirection] = useState(selectedDirection);
  function handleInputChange(event) {
    const { name, value } = event.target;

    setDirection({ ...direction, [name]: value });
  }
  return (
    <div style={{ display: "flex" }}>
      <div className="container" style={{ padding: 50 + "px" }}>
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <img
              src={editPhoto}
              alt="editPhoto"
              style={{ height: 80 + "vh" }}
            />
          </div>
          <div className="col-md-6" style={{ marginTop: 30 + "vh" }}>
            <h6 className="display-6" style={{ color: "#4125D9" }}>
              Mettre à jour la direction
            </h6>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                ctx.updateDirection(_id, direction);
                navigate("/directions");
              }}
            >
              <label htmlFor="name">Nom de le Direction</label>
              <input
                type="text"
                name="name"
                value={direction.name}
                onChange={handleInputChange}
                className="form-control"
              />
              <button className="btn btn-success my-2" type="submit">
                Modifier la direction
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
