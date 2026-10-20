export const motionStorageKey = "portfolio-motion";

// Apply the preference before paint, including when navigating between locale root layouts.
export const motionInitScript = `(()=>{let enabled=true;try{const saved=localStorage.getItem('${motionStorageKey}');if(saved==='on'||saved==='off')enabled=saved==='on'}catch{}document.documentElement.dataset.motion=enabled?'on':'off';for(const name of ['pageswap','pagereveal'])addEventListener(name,event=>{if(document.documentElement.dataset.motion==='off')event.viewTransition?.skipTransition()})})()`;
