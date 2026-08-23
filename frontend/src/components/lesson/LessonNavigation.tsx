import {ChevronLeft,ChevronRight} from "lucide-react";

export default function LessonNavigation(){
return(
<div className="flex justify-between border-t mt-12 pt-8">

<button className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-gray-50">
<ChevronLeft size={18}/>
Previous Lesson
</button>

<button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
Next Lesson
<ChevronRight size={18}/>
</button>

</div>
);
}