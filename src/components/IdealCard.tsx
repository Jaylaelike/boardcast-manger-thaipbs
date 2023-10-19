import { MdChevronLeft, MdChevronRight } from "react-icons/md";
function IdealCard() {
  const slideLeft = () => {
    const slider = document.getElementById("slider");
    if (slider) {
      slider.scrollLeft -= 500;
    }
  };

  const slideRight = () => {
    const slider = document.getElementById("slider");
    if (slider) {
      slider.scrollLeft += 500;
    }
  };



  const data = [
    {
      img: "https://res.cloudinary.com/satjay/image/upload/v1697446586/fi1tishluwpcypqyr41y.png",
      title: "Apple Watch Series 7 GPS",
      rating: 5.0,
    },
    {
      img: "https://res.cloudinary.com/satjay/image/upload/v1697446586/fi1tishluwpcypqyr41y.png",
      title: "Samsung Galaxy S21 Ultra 5G",
      rating: 4.5,
    },
    {
      img: "https://res.cloudinary.com/satjay/image/upload/v1697446586/fi1tishluwpcypqyr41y.png",
      title: "Sony WH-1000XM4",
      rating: 4.8,
    },
    {
      img: "https://res.cloudinary.com/satjay/image/upload/v1697446586/fi1tishluwpcypqyr41y.png",
      title: "Nintendo Switch OLED Model",
      rating: 4.9,
    },
    {
      img: "https://res.cloudinary.com/satjay/image/upload/v1697446586/fi1tishluwpcypqyr41y.png",
      title: "Dyson V11 Absolute ",
      rating: 4.7,
    },
    {
      img: "https://res.cloudinary.com/satjay/image/upload/v1697446586/fi1tishluwpcypqyr41y.png",
      title: "LG CX Series OLED TV",
      rating: 4.6,
    },
    {
      img: "https://res.cloudinary.com/satjay/image/upload/v1697446586/fi1tishluwpcypqyr41y.png",
      title: "Apple MacBook Pro M1",
      rating: 4.9,
    },
    {
      img: "https://res.cloudinary.com/satjay/image/upload/v1697446586/fi1tishluwpcypqyr41y.png",
      title: "Bose QuietComfort Earbuds",
      rating: 4.5,
    },
    {
      img: "https://res.cloudinary.com/satjay/image/upload/v1697446586/fi1tishluwpcypqyr41y.png",
      title: "GoPro HERO9 Black",
      rating: 4.8,
    },
    {
      img: "https://res.cloudinary.com/satjay/image/upload/v1697446586/fi1tishluwpcypqyr41y.png",
      title: "Microsoft Surface",
      rating: 4.7,
    },
  ];

  const cardSoft = data.map((item, index) => (
    <div
      key={index}
      className="w-[250px] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <a href="#">
        <img className="p-8 rounded-t-lg" src={item.img} alt="product image" />
      </a>
      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {item.title}
          </h5>
        </a>

        <div className="flex items-center mt-2.5 mb-5">
          {[...Array(Math.floor(item.rating))].map((_, index) => (
            <svg
              key={index}
              className="w-4 h-4 text-yellow-300 mr-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          ))}
          {item.rating % 1 !== 0 && (
            <svg
              className="w-4 h-4 text-yellow-300 mr-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          )}
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
            {item.rating}
          </span>
        </div>
      </div>
    </div>
  ));

  return (

    <>
      <div className="flex items-center">
        <MdChevronLeft
          className="opacity-50 cursor-pointer hover:opacity-100"
          onClick={slideLeft}
          size={40}
        />
        <div
          id="slider"
          className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          <div className="flex items-stretch justify-center space-x-3 p-5">
            {cardSoft}
          </div>
        </div>
        <MdChevronRight
          className="opacity-50 cursor-pointer hover:opacity-100"
          onClick={slideRight}
          size={40}
        />
      </div>
    </>
  );
}

export default IdealCard;
