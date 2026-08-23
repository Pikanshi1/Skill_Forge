type Props={
progress:number;
};

export default function LessonProgress({progress}:Props){
return(
<div className="my-8">
<div className="flex justify-between mb-2">
<span className="text-sm text-gray-500">Lesson Progress</span>
<span className="text-sm font-semibold">{progress}%</span>
</div>

<div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
<div style={{width:`${progress}%`}} className="h-full bg-blue-600 rounded-full"/>
</div>
</div>
);
}