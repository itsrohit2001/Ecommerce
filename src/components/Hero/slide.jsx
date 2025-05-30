function Slide({isFirstSlide, name}) {
  return (
    <>
    <div
      className="h-screen bg-cover bg-center flex flex-col justify-center items-center"
      style={{ backgroundImage: `url('/assets/background.png')` }}
    >
      <div>
        <h1 className="text-3xl text-white font-bold text-center">
          {name?name:"Welcome to the Slide Component"}
        </h1>
      </div>
      <div>
        <p className="text-center text-gray-100 mt-4">
          This is a simple slide component example.
        </p>
      </div>
      <div className="flex justify-center mt-8">
        <button className="bg-blue-400 text-white px-10 py-4 rounded hover:bg-blue-600 cursor-pointer">
          Click Me
        </button>
      </div>
    </div>
    </>
  );
}

export default Slide;
