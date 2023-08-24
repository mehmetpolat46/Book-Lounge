// universal id import
import { v4 } from "uuid";
import { useState } from "react";
import BookCard from "./components/BookCard";
import DeleteModal from "./components/DeleteModal";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import EditModal from "./components/EditModal";

function App() {
  const [books, setBooks] = useState([]);
  const [showDelete,setShowDelete] = useState(false);
  const [deleteId,setDeleteId] = useState(null);
  const [showEdit,setShowEdit] = useState(false);
  const [editingItem,setEditingItem] = useState(null);

  // formun gönderilme olayı
  const handleSubmit = (e) => {
    e.preventDefault();
    // kitap ismine erişme
    const title = e.target[0].value;

    if (!title) {
      toast.warn("Lütfen kitap ismi giriniz",{autoClose:2000})
      return;
    }

    // kitap objesi
    const newBook = {
      id: v4(),
      title,
      date: new Date(),
      isRead: false,
    };

    // oluşturulan objeyi kitaplar dizisine aktarma
    // setBooks([...books,newBook])
    setBooks([newBook,...books]);

    // inputu temizleme
    e.target[0].value = "";

    // bildirim verme
    toast.success("Kitap başarıyla eklendi",{autoClose: 2000})
  };

  // silme modal'ı için fonksiyon
  const handleModal = (id) => {
    // silinecek elemanın id'sini state'e aktarma
    setDeleteId(id);

    // modal'ı açar
    setShowDelete(true);
  };

  // silme işlemini yapar
  const handleDelete = () => {
    // id'sini bildiğimiz elemanı diziden çıkarma
    const filtred = books.filter((book)=>book.id !== deleteId);

    // state'i günceller
    setBooks(filtred);

    // modal'ı kapat 
    setShowDelete(false);

    // bildirim verme
    toast.error("Kitap başarıyla silindi",{autoClose: 2500})
  };

  // okundu işleminde çalışır
  const handleRead = (editItem) => {
    //! diziden bir elemanı güncelleme
    // okundu değerini tersine çevirme
    const updated = {...editItem,isRead: !editItem.isRead};
    
    //! 1. YÖNTEM
    // state'in kopyaasını alma
    // const clone = [...books];

    // düzenlenecek elemanın sırasını bulma
    // const index = books.findIndex((book)=> book.id === updated.id);

    // clone diziyi güncelleme
    // clone[index] = updated;

    //! 2. YÖNTEM
    const newBooks = books.map((item) =>
     item.id !== updated.id ? item : updated);

    // state'i güncelleme
    setBooks(newBooks);

  };

  // edit modal işlemleri
  const handleEditModal = (item) => {
    // modal'ı açar
    setShowEdit(true);

    // düzenlenecek elemanı state'e aktarma
    setEditingItem(item);
  };

  // elemanı güncelleme
  const updateItem = () => {
    // kitaplar dizisini dön
    // eleman düzenlenecek eleman değilse onu olduğu gibi yeni diziye aktar
    // eleman düzenlenecek olan ise güncel halini diziye aktar
    const newBooks = books.map((book)=>
    book.id !== editingItem.id ? book : editingItem
    );

    // state'i güncelleme
    setBooks(newBooks);

    // modal'ı kapatır
    setShowEdit(false);

    // bildirim verme
    toast.info("Kitap adı düzenlendi",{autoClose: 2000})
  };

  return (
    <div className="App">
      <header className="bg-primary text-light text-center py-2 fs-5 ">
        <h1>Book Lounge</h1>
      </header>
      <main className="container">
        {/* Form Section */}
        <form className="d-flex gap-3 mt-4 p-4" onSubmit={handleSubmit}>
          <input
            className="form-control shadow"
            type="text"
            placeholder="Bir Kitap İsmi Giriniz..."
          />
          <button className="btn btn-warning shadow">Ekle</button>
        </form>
        {/* Kitaplar dizisi boş ise */}
          {books.length === 0 && (<h4 className="mt-5 text-center">
            Henüz Herhangi Bir Kitap Eklenmedi</h4>)}
        {/* Kitaplar dizisi dolu ise */}
        {books.map((book) => (
          <BookCard key={book.id}
           handleModal={handleModal}
            data={book}
            handleRead={handleRead}
            handleEditModal={handleEditModal} />
            
        ))}
      </main>


      {/* Modallar */}
      {showDelete && (
        <DeleteModal
          setShowDelete={setShowDelete}
          handleDelete={handleDelete}/>
      )}

      {showEdit && (<EditModal editingItem={editingItem}
       setShowEdit={setShowEdit}
       setEditingItem={setEditingItem}
       updateItem={updateItem}
        />)}


      {/* Bildirimler Toast */}
      <ToastContainer/>
      
    </div>
  );
}

export default App;
