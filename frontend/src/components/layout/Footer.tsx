export default function Footer() {
  return (
    <footer className="border-t py-4 px-5 md:px-8 lg:px-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <div>
          <h2 className="font-semibold text-sm">
            AI Course Builder
          </h2>

          <p className="text-gray-500 mt-1 text-[11px]">
            Creating the future of AI powered education.
          </p>
        </div>

        <div className="text-gray-500 text-[11px]">
          © 2026 AI Course Builder. All rights reserved.
        </div>
      </div>
    </footer>
  );
}