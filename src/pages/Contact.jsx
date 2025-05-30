import React, { useEffect } from "react";

function Contact() {
    useEffect(() =>{
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="flex items-center justify-center bg-gray-50 p-8">
      <div className="p-8 bg-white rounded shadow-md w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Contact Us</h1>
        <p className="mb-2 text-center">
          Have questions or need help? Reach out to our support team!
        </p>
        <form className="flex flex-col">
          <input className="mb-2 p-2 border rounded" type="text" placeholder="Your Name" />
          <input className="mb-2 p-2 border rounded" type="email" placeholder="Your Email" />
          <textarea className="mb-2 p-2 border rounded" placeholder="Your Message"></textarea>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;