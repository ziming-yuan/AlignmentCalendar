'use client';
import { useState } from "react";
import getYouTubeID from 'get-youtube-id';
import getThumbnailUrl from '/utils/getThumbnailUrl';

const DoorsComponent = ({ doors }) => {
  const currentDate = new Date();

  const [selectedDoor, setSelectedDoor] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [doorsStatus, setDoorsStatus] = useState({});
  const [shakingDoorId, setShakingDoorId] = useState(null);

  // Toggle doorsStatus for a doorId
  const toggleDoorStatus = (doorId) => {
    setDoorsStatus((prevDoors) => ({
      ...prevDoors,
      [doorId]: true,
    }));
  };

  const handleDoorClick = (door) => {
    if (door.date && currentDate < new Date(door.date)) {
      // door cannot be opened yet
      // shake effect
      setShakingDoorId(door._id);
      return;
    }
    // Set door status to true
    // Set the selected door and open the modal
    toggleDoorStatus(door._id);
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
      {doors.map((door) => {
        // if beyond autoOpenTime or door is clicked once
        if (currentDate > new Date(door.autoOpenTime) || (currentDate >= new Date(door.date) && doorsStatus[door._id])){
          return (
            // if youtubeVideoUrl: display thumbnail; else if contentImage: display contentImage; else use closedDoorColor
            <div
              key={door._id}
              className= {`w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] shadow-md rounded-md flex items-center justify-center 
                ${ shakingDoorId === door._id && "animate-shake" }`}
                onAnimationEnd={() => setShakingDoorId(null)}
              style={
                door.youtubeVideoUrl
                  ? {
                      backgroundImage: `url(${getThumbnailUrl(getYouTubeID(door.youtubeVideoUrl), 'mq')})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }
                  : door.contentImage.fileUrl
                  ? {
                      backgroundImage: `url(${door.contentImage.fileUrl})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }
                  : {
                      backgroundColor: door.closedDoorColor,
                    }
              }
              // Handle door click event
              onClick={() => handleDoorClick(door)}
            >
              {!door.youtubeVideoUrl && !door.contentImage.fileUrl &&
                <p
                  className="text-lg text-center"
                  style={{ color: door.closedDoorTextColor }}
                >
                  Mystery Opened
                </p>
              } 
            </div>
          );
        } else {
          return (
            // otherwise, if closedDoorImage: display image; else use closedDoorColor
            <div
              key={door._id}
              className= {`w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] shadow-md rounded-md flex items-center justify-center 
                ${ shakingDoorId === door._id && "animate-shake" }`}
                onAnimationEnd={() => setShakingDoorId(null)}
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
              <p
                className="text-lg text-center"
                style={{ color: door.closedDoorTextColor }}
              >
                {door.closedDoorText}
              </p>
            </div>
          );
        }
      })}
      {modalOpen && selectedDoor && (
        // <div className="fixed top-0 left-0 bg-black bg-opacity-50 w-full h-full flex items-center justify-center">
        //   <div className="bg-white rounded-lg w-full max-h-[80vh] sm:max-h-[90vh] overflow-y-scroll mx-8 sm:max-w-2xl lg:max-w-3xl">
        <div className={`fixed inset-0 bg-black w-full h-full flex items-center justify-center transition-opacity ease-out duration-300 
                        ${modalOpen ? 'bg-opacity-50' : 'bg-opacity-0'}`}>
          <div className={`relative bg-white rounded-lg w-full max-h-[80vh] sm:max-h-[90vh] overflow-y-scroll mx-8 sm:max-w-2xl lg:max-w-3xl 
                          transform ease-out duration-300 
                          ${modalOpen ? 'translate-y-0 opacity-100 sm:scale-100' : 
                          'translate-y-4 opacity-0 sm:scale-95'}`}>
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