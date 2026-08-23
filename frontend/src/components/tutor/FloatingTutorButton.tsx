"use client";

import {Bot} from "lucide-react";

type Props={
onClick:()=>void;
};

export default function FloatingTutorButton({onClick}:Props){
return(
<button onClick={onClick} className="fixed right-6 bottom-6 w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xl hover:bg-blue-700 transition">
<Bot size={24}/>
</button>
);
}