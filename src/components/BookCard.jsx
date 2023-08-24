// prop'un obje olarak geldiğini ve
// içinde data olduğunu bildiğimizden
// prop'u dağıtıp direk data'ya erişiyoruz.

const BookCard = ({ data, handleModal, handleRead, handleEditModal }) => {
  return (
    
    <div id="cart" className="d-flex justify-content-between align-items-center mt-4 border  rounded p-3">
      <div>
        {/* isRead değeri true ise üzerini çizer */}
        <h5 className={data.isRead ? "text-decoration-line-through" : ""}>
          {data.title}
        </h5>
        <p>{new Date(data.date).toLocaleString()}</p>
      </div>
      <div className="btn-group">
        <button onClick={() => handleModal(data.id)} className="btn btn-danger">
          Sil
        </button>
        <button
          onClick={() => handleEditModal(data)}
          className="btn btn-primary">
          Düzenle
        </button>
        <button onClick={() => handleRead(data)} className="btn btn-success">
          {data.isRead ? "Okundu" : "Okunmadı"}
        </button>
      </div>
    </div>
  );
};

export default BookCard;
