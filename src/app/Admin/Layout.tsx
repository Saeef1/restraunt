import Nav from "./Nav";


export default  function Layout({ children }: {children: React.ReactNode}) {
 
  return <>
  <div className="mt-14 bg-gray-400 flex min-h-screen ">
    <Nav />
    <div className="text-black bg-white flex-grow mt-2 mr-2 rounded-lg p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        {children}
    </div>
  </div>
  </>;
}

