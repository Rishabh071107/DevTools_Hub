import { useRef } from 'react';
import {Upload, Play , Copy , Download , Trash2, RotateCw, History } from 'lucide-react';

function BottomToolbar ({ onUpload, onRun , onCopy , onDownload , onClear , onUndo , onRedo , onHistory}) {
  const fileInputRef = useRef(null);

  const handleUploadClick = () => fileInputRef.current?.click();
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if(file){
      onUpload(file); event.target.value = '';
    }
  }
  const btnGhost = "flex items-center gap-1.5 rounded-lg border border-border-custom bg-surface text-text-secondary px-4 py-2 font-semibold text-[11.5x] tracking-wide cursor-pointer outline-none whitespace-nowrap transition-all duration-150 hover:border-primary hover:text-text-primary active:scale-97";
  return(
  <div className="flex flex-wrap items-center justify-between gap-3 rounded-[14px] border border-border-custom bg-surface p-3 transition-colors duration-200">
    <input type='file' ref = {fileInputRef} onChange={handleFileChange} className="hidden" accept = "json,.txt,.yaml,.yml,.xml,.csv" aria-label = "upload file hidden input" />
    <div className="flex items-center gao-2 flex-wrap">
      <button 
      type="button"
      onClick={handleUploadClick}
      className={btnGhost}
      aria-label="Upload payload file"
      >
        <Upload size = {14}/>
        Upload file
      </button>
      <button
      type="button"
      onClick={onRun}
      className="flex items-center gap-1.5 rounded-lg border-none bg-gradient-to-br from-primary to-primaryHover text-white px-[18px] py-2 font-sans font-bold text-[11.5px] tracking-wide cursor-pointer outline-none whitespace-nowrap shadow-[0_0_14px_rgba(249,115,22,0.35)]  transition-all duration-150 hover:scale-[1.03] hover:shadow-[0_0_22px_rgba(249,115,22,0.55)] active:scale-97"
      aria-label="Run current tool execution">
        <Play size={14} fill= "currentColor"/>
        Run Tool
      </button>
    </div>
  <div className="flex items-center gap-2 flex-wrap">
    <div className="flex items-center border border-border-custom rounded-lg overflow-hidden bg-surface transition-colors duration-200">
      {[
        { Icon: RotateCcw , onClick: onUndo , label: 'Undo', last: false},
        { Icon: RotateCw, onClick: onRedo, label: 'Redo', last: false},
        { Icon: History, onClick: onHistory, label: 'History', last: true}

      ].map(({ Icon, onClick, label, last}) => (
       <button 
       key={label}
       type="button"
       onClick={onClick}
       title={label}
       aria-label ={label}
       className={`p-2 border-none bg-transparent text-text-muted cursor-pointer transition-all duration-150 outline-none hover:text-primary hover:bg-primary/8 ${
      last ? '' : 'border-r border-border-custom' }`}
       ><Icon size={14}/></button>
      ))}
    </div>
   <button
   type="button"
   onClick={onCopy}
   className={btnGhost}
   aria-label="Copy active workspace content">
    <Copy size={14}/>
    Copy
   </button>
  <button
  type="button"
  onClick={onDownload}
  className={btnGhost}
  aria-label="Download workspace contenr as file"
    >
    <Download size={14} />
    Download
    
  </button>
   <button
   type="button"
   onClick={onClear}
   className="flex items-center gap-1.5 rounded-lg font-sans font-semibold text-[11.5px] tracking-wide cursor-pointer outline-none border border-danger/25 bg-danger/6 text-danger px-4 py-2 transition-all duration-150 hover: bg-danger/14 hover:scale-[11.02] active: scale-97"
   aria-label="Clear active workspace"
   >
    <Trash2 size={14}/>
    Clear
   </button>
  </div>
  </div>
  )
}



export default BottomToolbar
