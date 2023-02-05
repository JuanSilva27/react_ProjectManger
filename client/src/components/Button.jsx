

export const Button = ({text}) => {
  return (
    <button
      variant="primary"
      type="submit"
      className="group relative h-12 overflow-hidden rounded-lg bg-white text-lg shadow w-full"
    >
      <div className="absolute inset-0 w-3 bg-green-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
      <span className="relative text-black group-hover:text-white uppercase capitalize font-black">
        {text}
      </span>
    </button>
  );
};
