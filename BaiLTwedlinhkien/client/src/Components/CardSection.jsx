/* eslint-disable react/prop-types */

const CardSection = ({ children, title, background, color }) => {
  return (
    <div className={`p-5 rounded-md mt-5`} style={{ background: background }}>
      <div className="flex justify-between items-center w-full">
        <h3
          className={`uppercase font-semibold text-2xl flex items-center gap-2`}
          style={{ color: color }}
        >
          <span className="h-2 w-2 bg-yellow-400 rounded-full animate-bounce " />
          {title}
        </h3>
      </div>
      <div className="py-4">{children}</div>
      <div className="w-full text-center">
        <a href="/collections/all">
          <button
            className={`relative overflow-hidden z-20 px-4 py-3 text-sm border rounded-md bg-white text-black font-medium effect-button transition-all ease-linear`}
          >
            Xem tất cả <span className="uppercase">{title}</span>
          </button>
        </a>
      </div>
    </div>
  );
};

export default CardSection;
