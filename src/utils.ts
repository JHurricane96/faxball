import { Direction } from "./types";

// Unique ID Generator
export function generateUniqueId(): string {
  return Math.random().toString(36).substr(2, 9);
}

// Map Arrow Keys to Directions
export function getDirectionFromKey(key: string): Direction | null {
  switch (key) {
    case 'ArrowUp':
      return 'up';
    case 'ArrowDown':
      return 'down';
    case 'ArrowLeft':
      return 'left';
    case 'ArrowRight':
      return 'right';
    default:
      return null;
  }
}

// Utility function to wait until ICE gathering is complete
export function waitForICEGatheringComplete(pc: RTCPeerConnection, isHost: boolean): Promise<void> {
  return new Promise((resolve) => {
    if (pc.iceGatheringState === 'complete') {
      resolve();
    } else {
      if (isHost) {
        // Handle ICE candidates
        pc.onicecandidate = (event) => {
          if (event.candidate) {
            console.log("New ICE candidate", event.candidate);
            if (event.candidate.type === 'srflx') {
              resolve();
            }
            // ICE candidates should be included in the SDP offer/answer for manual signaling
            // Since we're doing manual signaling, we don't need to handle them here
          }
        };
      }
      else {
        const checkState = () => {
          if (pc.iceGatheringState === 'complete') {
            pc.removeEventListener('icegatheringstatechange', checkState);
            resolve();
          }
        };
        pc.addEventListener('icegatheringstatechange', checkState);
      }
    }
  });
}