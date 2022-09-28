import Popup from "reactjs-popup";

const ControlledPopup = ({ type, closeModal, modelState }) => {
  console.log(type);
  return (
    <div>
      <Popup open={modelState} closeOnDocumentClick onClose={closeModal}>
        <div className="modal">
          <a className="close" onClick={closeModal}>
            &times;
          </a>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae magni
          omnis delectus nemo, maxime molestiae dolorem numquam mollitia,
          voluptate ea, accusamus excepturi deleniti ratione sapiente!
          Laudantium, aperiam doloribus. Odit, aut.
        </div>
      </Popup>
    </div>
  );
};

export default ControlledPopup;
