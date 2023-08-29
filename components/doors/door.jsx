'use client';
import { useState } from "react";
import Image from "next/image";

const ModalContent = ({ door }) => {
  return (
    <div className="modal-content">
      {door.youtubeVideoUrl && (
        <div className="youtube-frame">
          {/* Display the YouTube video within an iframe */}
          <iframe
            width="100%"
            height="315"
            src={door.youtubeVideoUrl}
            title="YouTube Video"
            allowFullScreen
          ></iframe>
        </div>
      )}
      {door.message && <p className="message">{door.message}</p>}
      {door.contentImage.fileUrl && (
        <div className="content-image">
          <Image
            src={door.contentImage.fileUrl}
            alt="Content Image"
            width={400}
            height={400}
            layout="responsive"
          />
        </div>
      )}
    </div>
  );
};

const Door = ({ door }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentTime = new Date();

  const handleDoorClick = () => {
    if (currentTime >= door.autoOpenTime || (currentTime >= door.date && !isModalOpen)) {
      setIsOpen(true);
    } else if (currentTime < door.date) {
      setIsModalOpen(true);
      setTimeout(() => setIsModalOpen(false), 1000); // Reset the modal state after 1 second
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="w-40 h-40 shadow-md relative cursor-pointer">
      {isOpen && !isModalOpen ? (
        door.youtubeVideoUrl ? (
          <div className="youtube-preview aspect-w-16 aspect-h-9">
            {/* Display the YouTube video preview */}
            <iframe
              src={door.youtubeVideoUrl}
              title="YouTube Video"
              className="w-full h-full"
            />
          </div>
        ) : (
          <Image
            src={door.contentImage.fileUrl}
            alt="Content Image"
            width={150}
            height={150}
            layout="fixed"
          />
        )
      ) : (
        <div
          className={`flex items-center justify-center w-full h-full ${
            isModalOpen || isOpen ? "" : "text-center"
          } ${
            isModalOpen && currentTime < door.date ? "shake" : ""
          }`}
          style={{
            backgroundColor: door.closedDoorColor,
            backgroundImage: door.closedDoorImage.fileUrl
              ? `url(${door.closedDoorImage.fileUrl})`
              : "none",
            color: door.closedDoorTextColor,
          }}
        >
          {isModalOpen || isOpen ? (
            <ModalContent door={door} onClose={() => setIsModalOpen(false)} />
          ) : (
            <p>{door.closedDoorText}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Door;