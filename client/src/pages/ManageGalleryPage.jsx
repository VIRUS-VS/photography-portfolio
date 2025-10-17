// import React, { useState, useEffect, useMemo } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import heic2any from 'heic2any';

// const ManageGalleryPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [gallery, setGallery] = useState(null);
//   const [photos, setPhotos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState(null);
//   const [uploadError, setUploadError] = useState(null);

//   const adminInfo = useMemo(() => JSON.parse(localStorage.getItem('adminInfo')), []);

//   const fetchGalleryAndPhotos = async () => {
//     try {
//       setLoading(true);
//       const galleryRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/galleries/${id}`);
//       const photosRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/photos/${id}`);
//       setGallery(galleryRes.data);
//       setPhotos(photosRes.data);
//     } catch (err) {
//       setError('Could not fetch gallery details.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!adminInfo) navigate('/admin/login');
//     else fetchGalleryAndPhotos();
//   }, [id, adminInfo, navigate]);

//   const uploadFilesHandler = async (e) => {
//     const files = e.target.files;
//     if (!files || files.length === 0) return;
//     setUploading(true);
//     setUploadError(null);
//     try {
//       const formData = new FormData();
//       for (let i = 0; i < files.length; i++) {
//         let file = files[i];
//         if (file.type === 'image/heic' || file.type === 'image/heif' || file.name.toLowerCase().endsWith('.heic')) {
//           const convertedBlob = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.8 });
//           file = new File([convertedBlob], `${file.name.split('.')[0]}.jpeg`, { type: 'image/jpeg' });
//         }
//         formData.append('images', file);
//       }
//       const config = { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${adminInfo.token}` } };
//       await axios.post(`${import.meta.env.VITE_API_URL}/api/photos/${id}`, formData, config);
//       alert('Photos uploaded successfully!');
//       fetchGalleryAndPhotos();
//     } catch (error) {
//       const message = error.response?.data?.message || 'File upload failed. Please try again.';
//       setUploadError(message);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const deletePhotoHandler = async (photoId) => {
//     if (window.confirm('Are you sure?')) {
//       try {
//         const config = { headers: { Authorization: `Bearer ${adminInfo.token}` } };
//         await axios.delete(`${import.meta.env.VITE_API_URL}/api/photos/${photoId}`, config);
//         fetchGalleryAndPhotos();
//       } catch (error) {
//         alert('Could not delete photo.');
//       }
//     }
//   };

//   const deleteGalleryHandler = async () => {
//     if (window.confirm('Are you sure? This will delete the entire gallery and all its photos.')) {
//       try {
//         const config = { headers: { Authorization: `Bearer ${adminInfo.token}` } };
//         await axios.delete(`${import.meta.env.VITE_API_URL}/api/galleries/${id}`, config);
//         alert('Gallery deleted successfully.');
//         navigate('/admin/dashboard');
//       } catch (error) {
//         alert('Could not delete gallery.');
//       }
//     }
//   };

//   const isVideo = (url) => url && url.match(/\.(mp4|mov)$/);

//   if (loading) return <p className="text-center pt-24">Loading...</p>;
//   if (error) return <p className="text-red-500 text-center pt-24">{error}</p>;

//   return (
//     <div className="pt-24 container mx-auto px-4">
//       <Link to="/admin/dashboard" className="text-blue-400 hover:underline mb-4 inline-block">&larr; Back to Dashboard</Link>
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-3xl font-light mb-2">Manage Gallery</h1>
//           <h2 className="text-2xl font-semibold text-blue-400">{gallery?.title}</h2>
//         </div>
//         <button onClick={deleteGalleryHandler} className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete Entire Gallery</button>
//       </div>
//       <div className="bg-gray-800 p-6 rounded-lg mb-8">
//         <h3 className="text-xl font-light mb-4">Upload New Photos/Videos</h3>
//         <input type="file" id="image-files" onChange={uploadFilesHandler} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:font-semibold file:bg-gray-700 file:text-gray-200 hover:file:bg-gray-600" multiple />
//         {uploading && <p className="text-blue-400 text-sm mt-2">Uploading...</p>}
//         {uploadError && <p className="text-red-500 text-sm mt-2">{uploadError}</p>}
//       </div>
//       <div>
//         <h3 className="text-xl font-light mb-4">Uploaded Photos</h3>
//         {photos.length === 0 ? <p className="text-gray-500">No photos uploaded yet.</p> : (
//           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
//             {photos.map(photo => (
//               <div key={photo._id} className="relative group">
//                 {isVideo(photo.imageUrl) ? <video src={photo.imageUrl} className="w-full h-40 object-cover rounded-lg" /> : <img src={photo.imageUrl} alt="" className="w-full h-40 object-cover rounded-lg" />}
//                 <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
//                   <button onClick={() => deletePhotoHandler(photo._id)} className="bg-red-600 text-white text-xs py-1 px-2 rounded">Delete</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
// export default ManageGalleryPage;


import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import heic2any from 'heic2any';

// This is the ADMIN page. It must use the PROTECTED routes.
const ManageGalleryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gallery, setGallery] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const adminInfo = useMemo(() => JSON.parse(localStorage.getItem('adminInfo')), []);

  const fetchGalleryAndPhotos = async () => {
    try {
      setLoading(true);
      // Admin requires a token for all requests
      const config = { headers: { Authorization: `Bearer ${adminInfo.token}` } };
      
      const galleryRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/galleries/${id}`, config);
      // THIS IS THE FIX: Use the protected admin route '/api/photos/:id'
      const photosRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/photos/${id}`, config);
      
      setGallery(galleryRes.data);
      setPhotos(photosRes.data);
    } catch (err) {
      setError('Could not fetch gallery details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!adminInfo) navigate('/admin/login');
    else fetchGalleryAndPhotos();
  }, [id, adminInfo, navigate]);

  // The rest of your file remains exactly the same...
  // (uploadFilesHandler, deletePhotoHandler, deleteGalleryHandler, JSX, etc.)

  const uploadFilesHandler = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    setUploadError(null);
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        if (file.type === 'image/heic' || file.type === 'image/heif' || file.name.toLowerCase().endsWith('.heic')) {
          const convertedBlob = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.8 });
          file = new File([convertedBlob], `${file.name.split('.')[0]}.jpeg`, { type: 'image/jpeg' });
        }
        formData.append('images', file);
      }
      const config = { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${adminInfo.token}` } };
      await axios.post(`${import.meta.env.VITE_API_URL}/api/photos/${id}`, formData, config);
      alert('Photos uploaded successfully!');
      fetchGalleryAndPhotos();
    } catch (error) {
      const message = error.response?.data?.message || 'File upload failed. Please try again.';
      setUploadError(message);
    } finally {
      setUploading(false);
    }
  };

  const deletePhotoHandler = async (photoId) => {
    if (window.confirm('Are you sure?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${adminInfo.token}` } };
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/photos/${photoId}`, config);
        fetchGalleryAndPhotos();
      } catch (error) {
        alert('Could not delete photo.');
      }
    }
  };

  const deleteGalleryHandler = async () => {
    if (window.confirm('Are you sure? This will delete the entire gallery and all its photos.')) {
      try {
        const config = { headers: { Authorization: `Bearer ${adminInfo.token}` } };
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/galleries/${id}`, config);
        alert('Gallery deleted successfully.');
        navigate('/admin/dashboard');
      } catch (error) {
        alert('Could not delete gallery.');
      }
    }
  };

  const isVideo = (url) => url && url.match(/\.(mp4|mov)$/);

  if (loading) return <p className="text-center pt-24">Loading...</p>;
  if (error) return <p className="text-red-500 text-center pt-24">{error}</p>;

  return (
    <div className="pt-24 container mx-auto px-4">
      <Link to="/admin/dashboard" className="text-blue-400 hover:underline mb-4 inline-block">&larr; Back to Dashboard</Link>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-light mb-2">Manage Gallery</h1>
          <h2 className="text-2xl font-semibold text-blue-400">{gallery?.title}</h2>
        </div>
        <button onClick={deleteGalleryHandler} className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete Entire Gallery</button>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-light mb-4">Upload New Photos/Videos</h3>
        <input type="file" id="image-files" onChange={uploadFilesHandler} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:font-semibold file:bg-gray-700 file:text-gray-200 hover:file:bg-gray-600" multiple />
        {uploading && <p className="text-blue-400 text-sm mt-2">Uploading...</p>}
        {uploadError && <p className="text-red-500 text-sm mt-2">{uploadError}</p>}
      </div>
      <div>
        <h3 className="text-xl font-light mb-4">Uploaded Photos</h3>
        {photos.length === 0 ? <p className="text-gray-500">No photos uploaded yet.</p> : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {photos.map(photo => (
              <div key={photo._id} className="relative group">
                {isVideo(photo.imageUrl) ? <video src={photo.imageUrl} className="w-full h-40 object-cover rounded-lg" /> : <img src={photo.imageUrl} alt="" className="w-full h-40 object-cover rounded-lg" />}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                  <button onClick={() => deletePhotoHandler(photo._id)} className="bg-red-600 text-white text-xs py-1 px-2 rounded">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default ManageGalleryPage;