import Sidebar from "./Sidebar";




type Props = {
  openSidebar: boolean;
  setOpenSidebar: (value: boolean) => void;
};

export default function MobileSidebar ({
    openSidebar,
    setOpenSidebar
}:Props){
    console.log("openSidebaropenSidebar",openSidebar)
    return(
         <div
          className={`
      fixed inset-0 z-50 md:hidden
       transition-opacity duration-300
   ${openSidebar ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
    `}
        >
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpenSidebar(false)}
          />

          {/* sidebar */}
          <div
            className={`
        relative h-full w-[240px] bg-white
        transform transition-transform duration-300
        ${openSidebar ? "translate-x-0" : "-translate-x-full"}
      `}
          >
            <Sidebar />
          </div>
        </div>
    )

}