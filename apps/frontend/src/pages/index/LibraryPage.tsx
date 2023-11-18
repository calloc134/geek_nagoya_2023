import { ImageGallery } from "src/components/ImageGallery";


const LibraryPage = () => {
  return(
    <>
      <h1 style={{
        textAlign: 'center',
        color: '#333',
        fontFamily: 'Arial, sans-serif',
        fontSize: '2.5rem',
        marginTop: '20px',
        marginBottom: '30px',        fontWeight: 'bold'
      }}>
        みんなの作品
      </h1>
      < ImageGallery/>
    </>
  )
}

export { LibraryPage } ;
