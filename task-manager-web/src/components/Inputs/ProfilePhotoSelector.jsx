// import React, { useRef, useState } from 'react';
// import { LuTrash, LuUpload, LuUser } from 'react-icons/lu';

// const ProfilePhotoSelector = ({ images, setImages }) => {
//   const inputRef = useRef(null);
//   const [previewUrl, setPreiviewUrl] = useState(null);

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setImages(file);

//       const preiview = URL.createObjectURL(file);
//       setPreiviewUrl(preiview);
//     }
//   };
//   const removeImageUrl = () => {
//     setImages(null);
//     setPreiviewUrl(null);
//   };
//   const onChooseImage = () => {
//     inputRef.current.click();
//   };
//   return (
//     <div className="flex justify-center mb-6">
//       <input
//         className="hidden"
//         type="file"
//         accept="image/*"
//         ref={inputRef}
//         onChange={handleImageChange}
//       />
//       {!images ? (
//         <div className="w-20 h-20 flex items-center justify-center bg-blue-100/50 rounded-full relative cursor-pointer">
//           <LuUser className="text-3xl text-blue-600" />
//           <button
//             type="button"
//             className="w-8 h-8 flex justify-center items-center rounded-full bg-blue-500  text-white absolute -bottom-1 -right-1 cursor-pointer"
//             onClick={onChooseImage}
//           >
//             <LuUpload />
//           </button>
//         </div>
//       ) : (
//         <div className="relative">
//           <img
//             src={previewUrl}
//             alt="profile pic"
//             className="w-20 h-20 rounded-full object-cover"
//           />
//           <button
//             type="button "
//             className="w-8 h-8 flex justify-center items-center absolute -bottom-1 -right-1 cursor-pointer bg-red-600 rounded-full "
//             onClick={removeImageUrl}
//           >
//             <LuTrash />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfilePhotoSelector;
