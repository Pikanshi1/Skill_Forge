"use client";

import {Bot,X} from "lucide-react";

type Props={
onClose:()=>void;
};

export default function TutorHeader({onClose}:Props){
return(
<div className="h-16 border-b flex items-center justify-between px-5 bg-white">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
<Bot size={20}/>
</div>

<div>
<h2 className="font-semibold">AI Tutor</h2>
<p className="text-xs text-gray-500">Ask anything about this lesson</p>
</div>
</div>

<button onClick={onClose}>
<X size={20}/>
</button>
</div>
);
}