const importScripts = (url, callback) => {
  const head = document.getElementsByTagName('head')[0]
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.onload = script.onreadystatechange = () => {
    if (
      !this.readyState ||
      this.readyState === 'loaded' ||
      this.readyState === 'complete'
    ) {
      callback()
      // Handle memory leak in IE
      script.onload = script.onreadystatechange = null
    }
  }
  script.src = url
  head.appendChild(script)
}

export default importScripts
