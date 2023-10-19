import { Avatar } from "@mui/material";
import MiniGraphTest from "./MiniGraphTest";

function ListHome() {
    const items = Array.from({ length: 20 }, (_, i) => ({
        name: `Person ${i + 1}`,
        email: `email${i + 1}@flowbite.com`,
        price: `$${Math.floor(Math.random() * 1000)}`,
      }));
  return (
   
    <>

    <ul className="divide-y divide-gray-200 dark:divide-gray-700 w-[1500px] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          {items.map((item) => (
            <li key={item.email} className="-mx-2 space-x-4 rounded-md transition-all hover:bg-accent hover:text-accent-foreground p-4">
              <div className="flex items-center space-x-4 h-10 w-auto">
                <div className="flex-shrink-0">
                  <Avatar
                    alt={item.name}
                    src={`/static/images/avatar/${item.name}.jpg`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {item.email}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  {item.price}
                </div>
                <div className="pt-2 inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  <MiniGraphTest />
                </div>
              </div>
            </li>
          ))}
        </ul>

 
    
    </>
  )
}

export default ListHome