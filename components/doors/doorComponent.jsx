'use client';
import { useState } from "react";

const DoorsComponent = ({ doors }) => {
  const currentDate = new Date();

  const [selectedDoor, setSelectedDoor] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleDoorClick = (door) => {
    if (door.autoOpenTime && currentDate < new Date(door.autoOpenTime)) {
      // Door is closed, do nothing on click
      return;
    }
    setSelectedDoor(door);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDoor(null);
  };

  return (
    <>
      {doors.map((door) => (
        <div
          key={door._id}
          className="w-150 h-150 shadow rounded flex items-center justify-center cursor-pointer"
          style={{
            backgroundColor: door.closedDoorImage.fileUrl
              ? "transparent"
              : door.closedDoorColor,
            backgroundImage: door.closedDoorImage.fileUrl
              ? `url(${door.closedDoorImage.fileUrl})`
              : "none",
          }}
          onClick={() => handleDoorClick(door)}
        >
          {currentDate < new Date(door.autoOpenTime) ? (
            <div className="text-center">
              <p
                className="text-lg text-black"
                style={{ color: door.closedDoorTextColor }}
              >
                {door.closedDoorText}
              </p>
            </div>
          ) : (
            <div className="text-center">
              <p
                className="text-lg text-white"
                style={{ color: door.closedDoorTextColor }}
              >
                {door.closedDoorText}
              </p>
            </div>
          )}
        </div>
      ))}

      {modalOpen && selectedDoor && (
        <div className="fixed top-0 left-0 bg-black bg-opacity-50 w-full h-full flex items-center justify-center">
          <div className="bg-white p-8 max-w-md w-full">
            {selectedDoor.youtubeVideoUrl && (
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={selectedDoor.youtubeVideoUrl}
                  title="YouTube Video"
                  className="w-full h-full"
                />
              </div>
            )}
            {selectedDoor.message && (
              <p className="my-4">{selectedDoor.message}</p>
            )}
            {selectedDoor.contentImage.fileUrl && (
              <img
                src={selectedDoor.contentImage.fileUrl}
                alt="Content Image"
                className="w-full"
              />
            )}
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DoorsComponent;