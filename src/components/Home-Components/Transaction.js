import React from 'react';

function Transaction({ name, count, date }) {
  return (
    <div className="h-20 border-2 shadow-lg shadow-gray-300 flex mb-4 xl:h-16">
      {/* <div className="h-12 border-2 shadow-lg shadow-gray-300 flex mb-4"></div> */}
      {count > 0 ? (
        <p className="h-full w-2.5 bg-blue-500"></p>
      ) : (
        <p className="h-full w-2.5 bg-red-500"></p>
      )}
      <div className="flex w-[90%] xl:flex-row lg:w-full ">
        <div className="flex flex-col lg:w-[70%] justify-center lg:items-center xl:items-start xl:pl-[3%] xl:pt-1 2xl:pl-[6%] w-full lg:justify-start">
          <p>{name}</p>
          <p>{count > 0 ? `+${count} €` : ` ${count} €`}</p>
        </div>
        <span className="flex items-center lg:h-[20px] lg:italic lg:text-sm lg:w-[25%] xl:h-full xl:text-base 2xl:w-[30%]">
          {date}
        </span>
      </div>
    </div>
  );
}

export default Transaction;
