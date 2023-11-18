import { useState } from "react";
import { css } from "src/lib/styled-system/css";
import { X } from "tabler-icons-react";

const imageUrls = [
  "https://via.placeholder.com/600/0000FF/808080?text=Image1",
  "https://via.placeholder.com/600/FF0000/FFFFFF?text=Image2",
  "https://via.placeholder.com/600/FFFF00/000000?text=Image3",
  "https://via.placeholder.com/600/000000/FFFFFF?text=Image4",
  "https://via.placeholder.com/600/0000FF/808080?text=Image1",
  "https://via.placeholder.com/600/FF0000/FFFFFF?text=Image2",
  "https://via.placeholder.com/600/FFFF00/000000?text=Image3",
  "https://via.placeholder.com/600/000000/FFFFFF?text=Image4",
  "https://via.placeholder.com/600/0000FF/808080?text=Image1",
  "https://via.placeholder.com/600/FF0000/FFFFFF?text=Image2",
  "https://via.placeholder.com/600/FFFF00/000000?text=Image3",
  "https://via.placeholder.com/600/000000/FFFFFF?text=Image4",
]; // 画像URL配列をインポート


const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState("");

  const showPopup = (url: string) => {
    setSelectedImage(url);
  };

  const closePopup = () => {
    setSelectedImage("");
  };

  return (
    <div>
      <div
        className={css({
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around'
        })}
      >
        {imageUrls.map((url, index) => (
          <div
            key={index}
            className={css({
              margin: '10px',
              height: 'auto',
              cursor: 'pointer',
              '&:hover': {
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.5)'
              },
              sm: {
                flexBasis: 'calc(20% - 20px)',
                maxWidth: 'calc(20% - 20px)'
              }
            })}
            onClick={() => showPopup(url)}
          >
            <img
              src={url}
              alt={`Image ${index + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <>
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(5px)',
            zIndex: 999,
          }} />
          <div className={css({
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
            borderRadius: '10px',
            padding: '40px',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '90%',
            height: 'auto',
            sm: {
              maxWidth: '700px',
              maxHeight: '700px',
            }
          })}>
            <button onClick={closePopup} className={css({
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            })}>
              <X size={24} />
            </button>
            <img
              src={selectedImage}
              alt="Selected"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain'
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export { ImageGallery };
