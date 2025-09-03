import { IoArrowBackCircleSharp } from 'react-icons/io5';

/*
To find icons use the link below.  Import the icon you want from react-icons and name it something simple. Reuse it throughout the app.

https://react-icons.github.io/react-icons/search/#q=back
*/

export const iconStore = { backButton: IoArrowBackCircleSharp };

//SVG boneyard left for history and future examples. They are simple and fast, but not worth the trouble if we can use a simple react icon library.

//https://heroicons.com/ for free svg icons

// const SearchIcon = (props) => {
//   const { currentColor } = props;
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       x="0px"
//       y="0px"
//       width="14"
//       height="14"
//       viewBox="0 0 24 24"
//     >
//       <path
//         d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 19.585938 21.585938 C 20.137937 22.137937 21.033938 22.137938 21.585938 21.585938 C 22.137938 21.033938 22.137938 20.137938 21.585938 19.585938 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"
//         fill={currentColor}
//       ></path>
//     </svg>
//   );
// };

// const BackButtonIcon = (props) => {
//   const { currentColor } = props;
//   return (
//     <svg
//       height={50}
//       width={50}
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 24 24"
//       strokeWidth={1.5}
//       stroke="currentColor"
//       // className="size-6"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
//         // fill={currentColor}
//       />
//     </svg>
//   );
// };
