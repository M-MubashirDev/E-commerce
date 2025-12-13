import { MdErrorOutline } from "react-icons/md";

function ErrorMessage({ error }) {
  if (!error) return null;

  return (
    <div className="max-w-md mx-auto mt-8 bg-white rounded-xl p-6 shadow-2xl">
      <div className="flex items-start gap-4">
        <MdErrorOutline className="text-red-500 text-3xl mt-1" />

        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Something went wrong
          </h2>
          <p className="mt-1 text-sm text-red-500 leading-relaxed">{error}</p>
        </div>
      </div>
    </div>
  );
}

export default ErrorMessage;
