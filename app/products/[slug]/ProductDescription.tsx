"use client";

export default function ProductDescription({ selected }: any) {
    return (
        <div className=" p-2 h-full">
            <h3 className="bg-[#f2f2f2] border  border-gray-200  !text-[16px] text-black px-3 py-[13px] font-bold">
                Mô tả ngắn
            </h3>

            <div className=" border space-y-3 text-sm leading-6 text-gray-700 px-[20px] py-[20px] ">

                <div className="flex justify-between gap-3  pb-2">
                    <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-black" />

                        <strong className="font-semibold text-black">
                            CPU:
                        </strong>
                        <span>{selected?.cpu}</span>
                    </span>
                </div>

                <div className="flex justify-between gap-3  pb-2">
                    <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-black" />
                        <strong className="font-semibold text-black">RAM:</strong>
                        <span>{selected?.ram}</span>
                    </span>
                </div>

                <div className="flex justify-between gap-3  pb-2">
                    <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-black" />

                        <strong className="font-semibold text-black">SSD:</strong>
                        <span>{selected?.ssd}</span>
                    </span>
                </div>

                <div className="flex justify-between gap-3  pb-2">
                    <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-black" />
                        <strong className="font-semibold text-black">VGA:</strong>
                        <span>{selected?.gpu}</span>
                    </span>
                </div>

                <div className="flex justify-between gap-3  pb-2">
                    <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-black" />
                        <strong className="font-semibold text-black">Màn hình:</strong>
                        <span>{selected?.screen}</span>
                    </span>
                </div>

            </div>
        </div>
    );
}

