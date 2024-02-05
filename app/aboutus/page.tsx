const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className=" mx-auto bg-white rounded p-6 shadow-md">
        <h1 className="text-3xl font-bold mb-6">Welcome to StaySync</h1>
        <p className="text-gray-700 mb-4">
          At StaySync, we make room reservation simple and efficient. Our
          platform, powered by React and Tailwind CSS, ensures a seamless
          booking experience.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
        <p className="text-gray-700 mb-6">
          StaySync is on a mission to redefine the room booking process. Our
          goal is to provide a user-friendly and enjoyable experience, combining
          the power of React for dynamic interfaces and Tailwind CSS for elegant
          designs.
        </p>

        <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
        <ul className="list-disc list-inside mb-6">
          <li className="mb-2">
            User-Centric Design: Our intuitive interface ensures a hassle-free
            booking experience.
          </li>
          <li className="mb-2">
            React-Powered Performance: Real-time updates and seamless
            interactions for a dynamic experience.
          </li>
          <li className="mb-2">
            Tailwind CSS Elegance: Stunning, responsive layouts for a polished
            appearance.
          </li>
          <li className="mb-2">
            Security and Reliability: Industry-standard measures to safeguard
            your data.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mb-4">Meet the Team</h2>
        <p className="text-gray-700 mb-6">
          The StaySync team is dedicated to creating innovative room reservation
          solutions. We continuously improve our system based on user feedback
          to enhance your booking experience.
        </p>

        <p className="text-gray-700">
          Thank you for choosing StaySync. Happy booking!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
