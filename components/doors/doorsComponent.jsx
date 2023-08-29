'use client';
import { useState } from "react";
import getYouTubeID from 'get-youtube-id';

const DoorsComponent = ({ doors }) => {
  const currentDate = new Date();

  const [selectedDoor, setSelectedDoor] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleDoorClick = (door) => {
    if (door.date && currentDate < new Date(door.date)) {
      // door cannot be opened yet
      // shake effect
      return;
    }
    // Set the selected door and open the modal
    setSelectedDoor(door);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    // Close the modal and reset selectedDoor
    setModalOpen(false);
    setSelectedDoor(null);
  };

  return (
    <>
      {doors.map((door) => (
        <div
          key={door._id}
          className="w-[150px] h-[150px] shadow rounded-md flex items-center justify-center cursor-pointer"
          style={{
            backgroundColor: door.closedDoorImage.fileUrl
              ? "transparent"
              : door.closedDoorColor,
            backgroundImage: door.closedDoorImage.fileUrl
              ? `url(${door.closedDoorImage.fileUrl})`
              : "none",
          }}
          // Handle door click event
          onClick={() => handleDoorClick(door)}
        >
          {/* Check if the door should be in a closed state based on autoOpenTime */}
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
            // Door is in a ready to open state
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

      {/* Render the modal if it's open and a door is selected */}
      {modalOpen && selectedDoor && (
        <div className="fixed top-0 left-0 bg-black bg-opacity-50 w-full h-full flex items-center justify-center">
          <div className="bg-white rounded-lg w-full mx-8 sm:max-w-2xl lg:max-w-3xl">
            {/* Display YouTube video if url is provided */}
            {selectedDoor.youtubeVideoUrl && (
                <iframe
                  src={getYoutubeUrl(selectedDoor.youtubeVideoUrl)}
                  title="YouTube Video"
                  className="w-full aspect-video"
                />
                // <YouTube videoId={getYouTubeID(selectedDoor.youtubeVideoUrl)} opts={opts} iframeClassName="w-full aspect-video" />; 
            )}
            {/* Display message if provided */}
            {selectedDoor.message && (
              <p className="m-4">{selectedDoor.message}</p>
            )}
            {/* Display content image if url is provided */}
            {selectedDoor.contentImage.fileUrl && (
              <img
                src={selectedDoor.contentImage.fileUrl}
                alt="Content Image"
                className="w-full"
              />
            )}
            {/* Close button for the modal */}
            <div className="flex justify-end">
              <button
                className="m-4 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DoorsComponent;

const getYoutubeUrl = (url) => {
  return `https://www.youtube.com/embed/${getYouTubeID(url)}`;
}