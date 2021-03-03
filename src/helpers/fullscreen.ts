export const setFullScreenToggle = (setIsFullScreen: (payload: boolean) => void) => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    setIsFullScreen(true)
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullScreen(false)
    }
  }
}
