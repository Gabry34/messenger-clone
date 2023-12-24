import React, { useEffect, useState } from "react";
import { MdLibraryAdd } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

export default function Images({
  selectedImage,
  passImages,
  resetImages,
}: any) {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (selectedImage) {
      setImages((prevImages) => [...prevImages, selectedImage]);
    }
  }, [selectedImage]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImages((prevImages) => [...prevImages, imageUrl]);
    }
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  useEffect(() => {
    passImages(images);
  }, [images]);

  useEffect(() => {
    setImages(resetImages);
  }, [resetImages]);

  return (
    <div className="w-full">
      {images[0] ? (
        <div className="w-full h-[70px] bg-[#F3F3F5] rounded-t-2xl flex gap-1 items-center px-3">
          <label
            htmlFor="imageInput"
            className="w-[50px] h-[50px] rounded-xl flex justify-center items-center bg-[#E4E6EB] cursor-pointer hover:bg-[#dcdde2]"
          >
            <MdLibraryAdd color={"black"} size={28} />
          </label>
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          {images.map((image, index) => (
            <div
              key={index}
              className="w-[60px] h-[60px] flex justify-center items-center relative"
            >
              <div className="h-[50px] w-[50px] relative">
                <img
                  src={image}
                  alt="image"
                  className="rounded-xl"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="absolute w-full h-full flex justify-end">
                <div
                  className="p-1 h-fit rounded-full bg-white border cursor-pointer"
                  onClick={() => handleDeleteImage(index)}
                >
                  <RxCross2 color={"black"} size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
