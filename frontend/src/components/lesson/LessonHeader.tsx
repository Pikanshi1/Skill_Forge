"use client";

import {Menu} from "lucide-react";

type Props={
title:string;
module:string;
progress:number;
onDrawerToggle:()=>void;
};

export default function LessonHeader({title,module,progress,onDrawerToggle}:Props){
return(
<div className="h-16 border-b bg-white flex items-center justify-between px-6 shrink-0">
<div className="flex items-center gap-4">
<button onClick={onDrawerToggle} className="p-2 rounded-lg hover:bg-gray-100">
<Menu size={22}/>
</button>

<div>
<p className="text-xs text-gray-500">{module}</p>
<h1 className="font-semibold text-lg">{title}</h1>
</div>
</div>

<div className="text-right">
<p className="text-xs text-gray-500">Progress</p>
<p className="font-semibold">{progress}%</p>
</div>
</div>
);
}