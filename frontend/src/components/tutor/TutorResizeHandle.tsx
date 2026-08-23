type Props = {
  onMouseDown: (e: React.MouseEvent) => void;
};

export default function TutorResizeHandle({ onMouseDown }: Props) {
  return (
    <div
      onMouseDown={onMouseDown}
      className="w-1 cursor-col-resize bg-gray-200 hover:bg-blue-500 transition"
    />
  );
}
