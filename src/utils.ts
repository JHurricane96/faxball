// Unique ID Generator
export function generateUniqueId(): string {
  return Math.random().toString(36).substr(2, 9);
}

// Utility function to wait until ICE gathering is complete
export function waitForICEGatheringComplete(pc: RTCPeerConnection): Promise<void> {
  return new Promise((resolve) => {
    if (pc.iceGatheringState === 'complete') {
      resolve();
    } else {
      const checkState = () => {
        if (pc.iceGatheringState === 'complete') {
          pc.removeEventListener('icegatheringstatechange', checkState);
          resolve();
        }
      };
      pc.addEventListener('icegatheringstatechange', checkState);
    }
  });
}