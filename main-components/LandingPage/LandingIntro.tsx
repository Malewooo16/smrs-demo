

export default function LandingIntro() {
  return (
    <section className="hero-section bg-landing text-white min-h-[80vh] flex flex-col justify-center items-center text-center px-4">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-opacity-80" style={{ backgroundColor: '#0f172a' }}></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-3xl">
        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Transforming School Management for a Connected Future
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          SMRS is a comprehensive platform designed to streamline school operations, enhancing communication and efficiency for all stakeholders.
        </p>

        {/* Call-to-Action Button */}
        <a
          href="#features"
          className="bg-navy hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300"
        >
          Explore SMRS
        </a>
      </div>
    </section>
  )
}
