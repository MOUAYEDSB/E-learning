import React from 'react';

function CalendarHeader() {
  return (
    <header className="flex gap-10 items-start self-start text-sm font-semibold text-indigo-950">
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/fb9e82df5bcd3e671e3f1ec21a947af168b977a2a6fc132f40e0b593459e7932?placeholderIfAbsent=true&apiKey=77ca8e3c659f40bebebb4bcfaa0ff738" className="object-contain shrink-0 w-5 aspect-square" alt="" />
      <h2 className="w-[72px]">July 2022</h2>
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/a53fc79a4aa5af34e7b278d8f2d9279627463b648de5ce6a54694deee0e4e560?placeholderIfAbsent=true&apiKey=77ca8e3c659f40bebebb4bcfaa0ff738" className="object-contain shrink-0 w-5 aspect-square" alt="" />
    </header>
  );
}

export default CalendarHeader;
