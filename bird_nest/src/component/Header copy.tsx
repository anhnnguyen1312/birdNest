// // components/Header.tsx
// import Link from "next/link";
// import styles from "@/styles/Header.module.scss";
// import {
//   MagnifyingGlassIcon,
//   HeartIcon,
//   ShoppingCartIcon,
//   UserIcon,
// } from "@heroicons/react/24/outline";
// export default function Header() {
//   return (
//     <header className="sticky top-0 z-50 w-full bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-solid border-b-[#f4f3f0] dark:border-b-[#3a3321]">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           <div className="flex items-center gap-8">
//             <Link href="/">
//               <img
//                 alt="Yến Sào Tinh Hoa Logo"
//                 className="h-10 w-auto"
//                 src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmDmUAQmrYQ-FNW0_vO5JhdF2oZZBXXNRbPL2qzL9bWBDHgGxl7bzmGsBX0eGwRNmaTCKMaw-wgcTD3nvbu0YX0DdfAAA4CbrnhU9cNI_njIMkQf7zk1-xtUhCbpVt20DHj6UVkLBmnVOKUsYqPbcj90gw0tTejX7nu4aQA3ssKT09_tBJoUZ-MsJ6tCHC3JctYe8gezoun-lVVXBYBsA-cKI67BViMV9yejVVECoNOWAHLdCsajMzY9uD06a1Yc4Gqctb0L4pISg"
//               />
//             </Link>
//             <nav className="hidden md:flex items-center gap-9">
//               <Link
//                 className="text-primary text-sm font-bold leading-normal"
//                 href="/home"
//               >
//                 {" "}
//                 Trang chủ{" "}
//               </Link>

//               <Link
//                 className="text-[#181611] dark:text-background-light hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal"
//                 href="/products"
//               >
//                 {" "}
//                 Sản Phẩm
//               </Link>
//               <Link
//                 className="text-[#181611] dark:text-background-light hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal"
//                 href="/about"
//               >
//                 {" "}
//                 Về Chúng Tôi
//               </Link>

//               <Link
//                 className="text-[#181611] dark:text-background-light hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal"
//                 href="/about"
//               >
//                 {" "}
//                 Kiến thức
//               </Link>
//             </nav>
//           </div>
//           <div className="flex flex-1 justify-end items-center gap-2 sm:gap-4">
//             <label className="hidden sm:flex flex-col min-w-40 !h-10 max-w-64">
//               <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
//                 <div className="text-[#897f61] dark:text-primary/70 flex bg-[#f4f3f0] dark:bg-background-dark border border-solid border-[#e6e3db] dark:border-[#3a3321] items-center justify-center pl-3 rounded-l-lg border-r-0">
//                   <MagnifyingGlassIcon className="h-6 w-6" />
//                 </div>
//                 <input
//                   className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#181611] dark:text-background-light focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-solid border-[#e6e3db] dark:border-[#3a3321] bg-[#f4f3f0] dark:bg-background-dark h-full placeholder:text-[#897f61] dark:placeholder:text-gray-400 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
//                   placeholder="Tìm kiếm"
//                   value=""
//                   readOnly
//                 />
//               </div>
//             </label>
//             <div className="flex gap-2">
//               <Link
//                 className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-transparent dark:text-background-light text-[#181611] hover:bg-primary/20 dark:hover:bg-primary/20 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
//                 href="/likes"
//               >
//                 {" "}
//                 <HeartIcon className="h-6 w-6" />
//               </Link>
//               <Link
//                 className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-transparent dark:text-background-light text-[#181611] hover:bg-primary/20 dark:hover:bg-primary/20 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
//                 href="/cart"
//               >
//                 {" "}
//                 <ShoppingCartIcon className="h-6 w-6" />
//               </Link>
//               <Link
//                 className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-transparent dark:text-background-light text-[#181611] hover:bg-primary/20 dark:hover:bg-primary/20 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
//                 href="/login"
//               >
//                 {" "}
//                 <UserIcon className="h-6 w-6" />
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }
