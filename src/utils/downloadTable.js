import XLSX from 'xlsx'

const saveAs = (binaryFile, fileName) => {
  // 当然可以自定义简单的下载文件实现方式
  var tmpa = document.createElement('a')
  tmpa.download = fileName || '下载'
  tmpa.href = URL.createObjectURL(binaryFile) // 绑定a标签
  tmpa.click() // 模拟点击实现下载
  setTimeout(function () {
    // 延时释放
    // document.removeChild(tmpa)
    URL.revokeObjectURL(binaryFile) // 用URL.revokeObjectURL()来释放这个object URL
  }, 100)
}

const s2ab = s => {
  if (typeof ArrayBuffer !== 'undefined') {
    let buf = new ArrayBuffer(s.length)
    let view = new Uint8Array(buf)
    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xff
    }
    return buf
  } else {
    let buf = new Array(s.length)
    for (let i = 0; i !== s.length; ++i) {
      buf[i] = s.charCodeAt(i) & 0xff
    }
    return buf
  }
}

// 这里的数据是用来定义导出的格式类型
const wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' }
// const wopts = { bookType: 'csv', bookSST: false, type: 'binary' };//ods格式
// const wopts = { bookType: 'ods', bookSST: false, type: 'binary' };//ods格式
// const wopts = { bookType: 'xlsb', bookSST: false, type: 'binary' };//xlsb格式
// const wopts = { bookType: 'fods', bookSST: false, type: 'binary' };//fods格式
// const wopts = { bookType: 'biff2', bookSST: false, type: 'binary' };//xls格式

const downloadTable = (fileName, data, hearder) => {
  // const h = { header: ['时间', '价格', '平衡'], skipHeader: true }
  const wb = { SheetNames: ['Sheet1'], Sheets: {}, Props: {} }
  // 通过json_to_sheet转成单页(Sheet)数据
  wb.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(data)
  // 文件类型
  const fileType = { type: 'application/octet-stream' }
  // 文件名称
  const fn = `${fileName}.${wopts.bookType}`
  const bf = s2ab(XLSX.write(wb, wopts))
  saveAs(new Blob([bf], fileType), fn)
}

export default downloadTable
