const Slide = ({isFirstSlide, name}) => {
  return (
    <>
    <div
      className="flex flex-col items-center justify-center h-screen bg-center bg-cover"
      style={{ backgroundImage: `url('/assets/background.png')` }}
    >
      <div>
        <h1 className="text-3xl font-bold text-center text-white">
          {name?name:"Welcome to the Slide Component"}
        </h1>
      </div>
      <div>
        <p className="mt-4 text-center text-gray-100">
          This is a simple slide component example.
        </p>
      </div>
      <div className="flex justify-center mt-8">
        <button className="px-10 py-4 text-white bg-blue-400 rounded cursor-pointer hover:bg-blue-600">
          Click Me
        </button>
      </div>
    </div>
    </>
  );
}

export default Slide;
