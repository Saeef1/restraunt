import MenuCard from "./ui/menuCard";

export default function Menu({ Title }: { Title: string }) {
  return (
    <>
      
        <section className=" py-10 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="font-bebas text-5xl md:text-6xl text-white mb-4">
                <span className="text-[crimson]">OUR</span> {Title || "MENU"}
              </h1>
              
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 ">
              <MenuCard Catagory={Title} />
            </div>
          </div>
        </section>
      
    </>
  );
}
