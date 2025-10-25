// import React, { useState, useEffect, useMemo } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import heic2any from 'heic2any';

// const AdminDashboardPage = () => {
//     const navigate = useNavigate();
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [coverImage, setCoverImage] = useState('');
//     const [uploading, setUploading] = useState(false);
//     const [error, setError] = useState(null);
//     const [uploadError, setUploadError] = useState(null);
//     const [galleries, setGalleries] = useState([]);
  
//     const adminInfo = useMemo(() => JSON.parse(localStorage.getItem('adminInfo')), []);
  
//     const fetchGalleries = async () => {
//       try {
//         const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/galleries`);
//         setGalleries(data);
//       } catch (error) { console.error('Could not fetch galleries'); }
//     };
  
//     useEffect(() => {
//       if (!adminInfo) navigate('/admin/login');
//       else fetchGalleries();
//     }, [adminInfo, navigate]);
  
//     const logoutHandler = () => {
//       localStorage.removeItem('adminInfo');
//       navigate('/admin/login');
//     };
  
//     const uploadFileHandler = async (e) => {
//       let file = e.target.files[0];
//       if (!file) return;
//       setUploading(true);
//       setUploadError(null);
//       try {
//         if (file.type === 'image/heic' || file.type === 'image/heif' || file.name.toLowerCase().endsWith('.heic')) {
//           const convertedBlob = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.8 });
//           file = new File([convertedBlob], `${file.name.split('.')[0]}.jpeg`, { type: 'image/jpeg' });
//         }
//         const formData = new FormData();
//         formData.append('image', file);
//         const config = { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${adminInfo.token}` } };
//         const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/upload`, formData, config);
//         setCoverImage(data.image);
//       } catch (error) {
//         setUploadError('File type not supported or upload failed.');
//       } finally {
//           setUploading(false);
//       }
//     };
  
//     const submitHandler = async (e) => {
//       e.preventDefault();
//       if (!coverImage) { setError('Please upload a cover image first.'); return; }
//       try {
//         const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminInfo.token}` } };
//         await axios.post(`${import.meta.env.VITE_API_URL}/api/galleries`, { title, description, coverImage }, config);
//         alert('Gallery created successfully!');
//         fetchGalleries();
//         setTitle(''); setDescription(''); setCoverImage('');
//         document.getElementById('image-file').value = null;
//       } catch (error) {
//         setError('Failed to create gallery. Please check all fields.');
//       }
//     };
  
//     const deleteHandler = async (id) => {
//       if (window.confirm('Are you sure you want to delete this gallery? This will also delete all photos inside it and cannot be undone.')) {
//           try {
//               const config = { headers: { Authorization: `Bearer ${adminInfo.token}` } };
//               await axios.delete(`${import.meta.env.VITE_API_URL}/api/galleries/${id}`, config);
//               fetchGalleries();
//           } catch (error) { alert('Could not delete gallery.'); }
//       }
//     }
  
//     return (
//       <div className="pt-24 container mx-auto px-4">
//         <div className="flex justify-between items-center mb-10">
//           <h1 className="text-3xl font-light">Admin Dashboard</h1>
//           <div className="flex items-center space-x-4">
//               <Link to="/admin/profile" className="text-sm text-gray-300 hover:text-white">Update Profile</Link>
//               <button onClick={logoutHandler} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button>
//           </div>
//         </div>
//         <div className="mb-10 p-4 bg-gray-800 rounded border border-gray-700"><Link to="/admin/settings" className="text-lg font-semibold text-blue-400 hover:underline">&#9881; Manage Site-Wide Settings</Link></div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//           <div>
//             <h2 className="text-2xl font-light mb-4 border-b border-gray-700 pb-2">Create New Gallery</h2>
//             {error && <p className="text-red-500 mb-4">{error}</p>}
//             <form onSubmit={submitHandler} className="space-y-4">
//               <div><label htmlFor="title" className="block mb-2 text-sm">Title</label><input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-700 rounded" required /></div>
//               <div><label htmlFor="description" className="block mb-2 text-sm">Description</label><textarea id="description" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-700 rounded" required></textarea></div>
//               <div><label htmlFor="image" className="block mb-2 text-sm">Cover Image/Video</label><input type="text" id="image-path" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-700 rounded mb-2" placeholder="Image URL will appear here after upload" readOnly /><input type="file" id="image-file" onChange={uploadFileHandler} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-gray-200 hover:file:bg-gray-600" />{uploading && <p className="text-sm mt-2 text-blue-400">Uploading...</p>}{uploadError && <p className="text-red-500 text-sm mt-2">{uploadError}</p>}</div>
//               <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create Gallery</button>
//             </form>
//           </div>
//           <div>
//              <h2 className="text-2xl font-light mb-4 border-b border-gray-700 pb-2">Manage Existing Galleries</h2>
//              <div className="space-y-3">
//                {galleries.length === 0 ? (<p className="text-gray-500">No galleries created yet.</p>) : (
//                   galleries.map((gallery) => (
//                       <div key={gallery._id} className="bg-gray-800 p-3 rounded flex justify-between items-center">
//                           <p className="font-semibold">{gallery.title}</p>
//                           <div className="flex items-center space-x-2">
//                               <Link to={`/admin/gallery/${gallery._id}`} className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 text-sm rounded">Manage</Link>
//                               <button onClick={() => deleteHandler(gallery._id)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 text-sm rounded">Delete</button>
//                           </div>
//                       </div>
//                   ))
//                )}
//              </div>
//           </div>
//         </div>
//       </div>
//     );
// };
// export default AdminDashboardPage;

// import React, { useState, useEffect, useMemo } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const AdminDashboardPage = () => {
//     const navigate = useNavigate();
//     const [galleries, setGalleries] = useState([]);
    
//     // State for the new gallery form
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [coverImage, setCoverImage] = useState('');
//     const [selectedFile, setSelectedFile] = useState(null);

//     // State for upload feedback
//     const [uploading, setUploading] = useState(false);
//     const [uploadError, setUploadError] = useState('');

//     const adminInfo = useMemo(() => JSON.parse(localStorage.getItem('adminInfo')), []);

//     useEffect(() => {
//         if (!adminInfo) {
//             navigate('/admin/login');
//         } else {
//             const fetchGalleries = async () => {
//                 try {
//                     const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/galleries`);
//                     setGalleries(data);
//                 } catch (error) {
//                     console.error('Failed to fetch galleries', error);
//                 }
//             };
//             fetchGalleries();
//         }
//     }, [adminInfo, navigate]);

//     const handleFileChange = async (e) => {
//         const file = e.target.files[0];
//         if (!file) return;

//         setSelectedFile(file);
//         setUploading(true);
//         setUploadError('');
//         setCoverImage('');

//         const formData = new FormData();
//         formData.append('image', file);

//         try {
//             const config = { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${adminInfo.token}` } };
//             const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/uploads`, formData, config);
            
//             setCoverImage(data.image);
//         } catch (error) {
//             setUploadError('File type not supported or upload failed.');
//             setSelectedFile(null);
//         } finally {
//             setUploading(false);
//         }
//     };
    
//     const createGalleryHandler = async (e) => {
//         e.preventDefault();
//         if (!title || !description || !coverImage) {
//             alert('Please fill in all fields and ensure the cover image has uploaded successfully.');
//             return;
//         }
//         try {
//             const config = { headers: { Authorization: `Bearer ${adminInfo.token}` } };
//             const { data: newGallery } = await axios.post(`${import.meta.env.VITE_API_URL}/api/galleries`, { title, description, coverImage }, config);
            
//             setGalleries([newGallery, ...galleries]);
//             setTitle('');
//             setDescription('');
//             setCoverImage('');
//             setSelectedFile(null);
//             alert('Gallery created successfully!');
//         } catch (error) {
//             alert('Failed to create gallery.');
//         }
//     };

//     const deleteGalleryHandler = async (id) => {
//         if (window.confirm('Are you sure you want to delete this gallery?')) {
//             try {
//                 const config = { headers: { Authorization: `Bearer ${adminInfo.token}` } };
//                 await axios.delete(`${import.meta.env.VITE_API_URL}/api/galleries/${id}`, config);
//                 setGalleries(galleries.filter(g => g._id !== id));
//             } catch (error) {
//                 alert('Failed to delete gallery.');
//             }
//         }
//     };

//     return (
//         <div className="pt-24 container mx-auto px-4">
//             <h1 className="text-3xl font-light mb-8">Admin Dashboard</h1>
            
//             {/* --- ADD THIS SECTION BACK --- */}
//             <div className="bg-gray-800 p-6 rounded-lg mb-8">
//                 <Link to="/admin/settings" className="text-xl font-semibold text-yellow-400 hover:text-yellow-300">
//                     Manage Site-Wide Settings
//                 </Link>
//             </div>
//             {/* --- END OF ADDED SECTION --- */}

//             <div className="grid md:grid-cols-2 gap-8">
//                 {/* Create New Gallery Section */}
//                 <div className="bg-gray-800 p-6 rounded-lg">
//                     <h2 className="text-2xl font-semibold mb-4 text-yellow-400">Create New Gallery</h2>
//                     <form onSubmit={createGalleryHandler}>
//                         {/* Form fields... */}
//                         <div className="mb-4">
//                             <label htmlFor="title" className="block text-sm mb-1">Title</label>
//                             <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-gray-700 p-2 rounded" />
//                         </div>
//                         <div className="mb-4">
//                             <label htmlFor="description" className="block text-sm mb-1">Description</label>
//                             <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-gray-700 p-2 rounded" rows="3"></textarea>
//                         </div>
//                         <div className="mb-4">
//                             <label className="block text-sm mb-1">Cover Image/Video</label>
//                             <input type="text" value={coverImage || 'Image URL will appear here after upload'} readOnly className="w-full bg-gray-700 p-2 rounded mb-2 text-gray-400" />
//                             <input type="file" id="cover-image-file" onChange={handleFileChange} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:font-semibold file:bg-gray-600 file:text-gray-200 hover:file:bg-gray-500" />
//                             {uploading && <p className="text-blue-400 text-sm mt-2">Uploading...</p>}
//                             {uploadError && <p className="text-red-500 text-sm mt-2">{uploadError}</p>}
//                         </div>
//                         <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded" disabled={uploading}>
//                             Create Gallery
//                         </button>
//                     </form>
//                 </div>

//                 {/* Manage Existing Galleries Section */}
//                 <div className="bg-gray-800 p-6 rounded-lg">
//                     <h2 className="text-2xl font-semibold mb-4 text-yellow-400">Manage Existing Galleries</h2>
//                     <div className="space-y-3">
//                         {galleries.map(gallery => (
//                             <div key={gallery._id} className="flex justify-between items-center bg-gray-700 p-3 rounded">
//                                 <p>{gallery.title}</p>
//                                 <div>
//                                     <Link to={`/admin/gallery/${gallery._id}`} className="bg-green-600 hover:bg-green-500 text-white py-1 px-3 rounded mr-2">Manage</Link>
//                                     <button onClick={() => deleteGalleryHandler(gallery._id)} className="bg-red-600 hover:bg-red-500 text-white py-1 px-3 rounded">Delete</button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminDashboardPage;

// -----------------------------------------------------------------------------------------------------

import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboardPage = () => {
    const navigate = useNavigate();
    const [galleries, setGalleries] = useState([]);
    
    // State for the new gallery form
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    // State for upload feedback
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');

    const adminInfo = useMemo(() => JSON.parse(localStorage.getItem('adminInfo')), []);

    useEffect(() => {
        if (!adminInfo) {
            navigate('/admin/login');
        } else {
            const fetchGalleries = async () => {
                try {
                    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/galleries`);
                    setGalleries(data);
                } catch (error) {
                    console.error('Failed to fetch galleries', error);
                }
            };
            fetchGalleries();
        }
    }, [adminInfo, navigate]);

    // --- 1. ADD THE LOGOUT HANDLER FUNCTION ---
    const logoutHandler = () => {
        localStorage.removeItem('adminInfo');
        navigate('/admin/login');
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setSelectedFile(file);
        setUploading(true);
        setUploadError('');
        setCoverImage('');

        const formData = new FormData();
        formData.append('image', file);

        try {
            const config = { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${adminInfo.token}` } };
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/uploads`, formData, config);
            
            setCoverImage(data.image);
        } catch (error) {
            setUploadError('File type not supported or upload failed.');
            setSelectedFile(null);
        } finally {
            setUploading(false);
        }
    };
    
    const createGalleryHandler = async (e) => {
        e.preventDefault();
        if (!title || !description || !coverImage) {
            alert('Please fill in all fields and ensure the cover image has uploaded successfully.');
            return;
        }
        try {
            const config = { headers: { Authorization: `Bearer ${adminInfo.token}` } };
            const { data: newGallery } = await axios.post(`${import.meta.env.VITE_API_URL}/api/galleries`, { title, description, coverImage }, config);
            
            setGalleries([newGallery, ...galleries]);
            setTitle('');
            setDescription('');
            setCoverImage('');
            setSelectedFile(null);
            alert('Gallery created successfully!');
        } catch (error) {
            alert('Failed to create gallery.');
        }
    };

    const deleteGalleryHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this gallery?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${adminInfo.token}` } };
                await axios.delete(`${import.meta.env.VITE_API_URL}/api/galleries/${id}`, config);
                setGalleries(galleries.filter(g => g._id !== id));
            } catch (error) {
                alert('Failed to delete gallery.');
            }
        }
    };

    return (
        <div className="pt-24 container mx-auto px-4">
            
            {/* --- 2. ADDED HEADER WITH LOGOUT BUTTON --- */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-light">Admin Dashboard</h1>
                <div>
                    <Link 
                        to="/admin/profile" 
                        className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-4"
                    >
                        Update Profile
                    </Link>
                    <button
                        onClick={logoutHandler}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Logout
                    </button>
                </div>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg mb-8">
                <Link to="/admin/settings" className="text-xl font-semibold text-yellow-400 hover:text-yellow-300">
                    Manage Site-Wide Settings
                </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Create New Gallery Section */}
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4 text-yellow-400">Create New Gallery</h2>
                    <form onSubmit={createGalleryHandler}>
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm mb-1">Title</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-gray-700 p-2 rounded" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm mb-1">Description</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-gray-700 p-2 rounded" rows="3"></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm mb-1">Cover Image/Video</label>
                            <input type="text" value={coverImage || 'Image URL will appear here after upload'} readOnly className="w-full bg-gray-700 p-2 rounded mb-2 text-gray-400" />
                            <input type="file" id="cover-image-file" onChange={handleFileChange} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:font-semibold file:bg-gray-600 file:text-gray-200 hover:file:bg-gray-500" />
                            {uploading && <p className="text-blue-400 text-sm mt-2">Uploading...</p>}
                            {uploadError && <p className="text-red-500 text-sm mt-2">{uploadError}</p>}
                        </div>
                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded" disabled={uploading}>
                            Create Gallery
                        </button>
                    </form>
                </div>

                {/* Manage Existing Galleries Section */}
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4 text-yellow-400">Manage Existing Galleries</h2>
                    <div className="space-y-3">
                        {galleries.map(gallery => (
                            <div key={gallery._id} className="flex justify-between items-center bg-gray-700 p-3 rounded">
                                <p>{gallery.title}</p>
                                <div>
                                    <Link to={`/admin/gallery/${gallery._id}`} className="bg-green-600 hover:bg-green-500 text-white py-1 px-3 rounded mr-2">Manage</Link>
                                    <button onClick={() => deleteGalleryHandler(gallery._id)} className="bg-red-600 hover:bg-red-500 text-white py-1 px-3 rounded">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;