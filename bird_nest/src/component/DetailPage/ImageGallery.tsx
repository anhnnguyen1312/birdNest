import React from "react";

function ImageGallery() {
  return (
    <div className="flex flex-col gap-4">
      <div
        className="w-full bg-center bg-no-repeat bg-cover aspect-square rounded-xl shadow-sm"
        data-alt="Large product image of premium refined bird's nest"
        style={{
          backgroundImage:
            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDhOLVi5VPpzPq0wkIEBaHiFVPDlesmxjo1-pxpG_ebsAWbhQsWAjwwVwzPxg7nXQUoRtC2pgmrKz9wwH-roDBamHs4z0MJzRvNOHfxy166fjLFmkIxS_uMYqJhMucVtz_JUC_6RzkqatjXwgL8aYgpT7E093mqTus0NuVplNJfTBvB65VGuFCthAE05wWTYwWOsWramy2y7k8KiPTH1G4q-WAnAg6s2wt154I6JghF6W8PrI7ZFCArZaP0pLcnvY6XZlAMVx_r0Ls")',
        }}
      ></div>
      <div className="grid grid-cols-4 gap-4">
        <div
          className="w-full bg-center bg-no-repeat bg-cover aspect-square rounded-lg border-2 border-primary"
          data-alt="Thumbnail of bird's nest from another angle"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB-Osnl4u1Vepona5whifUQzzpYSFIF3FMBxFZDlSPKe9ZYSQQt2GDvKnuYjv9uQpgMW7lSh854AUviHbsNw74asEwKBfDFYG8mGkvK93S-Trk-zMDpr5bE6PMxWTF5r39j2d3siSw2uI54fHZ3cQLO5p8n1ng6yffRhalAtozYK7d9NrG55np9P7BdqvCLuPZ7hYtFI5b2UorjrHvUUq29RCPjKdJXVPk5zR_f4DgMPkYoDimyTpa56RanY-zorzKbho7yLt8Rioc")',
          }}
        ></div>
        <div
          className="w-full bg-center bg-no-repeat bg-cover aspect-square rounded-lg opacity-70 hover:opacity-100 cursor-pointer transition-opacity"
          data-alt="Thumbnail of packaged bird's nest product"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCGN-c29xur_UfMJjhrnq_4EcSqtCcAonGmBPYBiH0HbSo6OTjPx_8xow6017mIOUsA4jZPQJdjihXvj4hHkZxtB4t82UL1dIqXZGZvxJuY8qC-VI7p3jbEeL3-FLAJFP6lWvmZokyGoFgxcPd0MaCynJxFe6tdYeakCsZiQyoGgIqIaD_YO6Gx3hgXDlhYJ9YCWssbUtDc6UMpy9Az3bklfWy6wt5RqCJ41ddmvNhAiWYk0Ftx1pwu9SuMy2Bh0ThBjiRFKPuBZ8g")',
          }}
        ></div>
        <div
          className="w-full bg-center bg-no-repeat bg-cover aspect-square rounded-lg opacity-70 hover:opacity-100 cursor-pointer transition-opacity"
          data-alt="Thumbnail showing texture of the bird's nest"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAqb3wtbNxdOMABUX4CJXopH9rXouuYvUQjYhs-TcN2LxNb8mS7-B0e5lS5SHwKYsydpHHbJKqcrIwY9taogHI28KI-ltR9inOXwraaRqlei7wEZZsCJVMI1AT890n7mcgLjb1tWrvLVDWHNHvq97s-T7FZ28lUpeo96UJ_NCUFdizKUOv_O6U4OGLLFfeWa0NNcG8SB2ZBDjHGpF2K2wAF33CcfHBGdL_94BogNprmlij3VStXYQKSqoYJmL67IjHkZw8oN1UJTGE")',
          }}
        ></div>
        <div
          className="w-full bg-center bg-no-repeat bg-cover aspect-square rounded-lg opacity-70 hover:opacity-100 cursor-pointer transition-opacity"
          data-alt="Thumbnail of prepared bird's nest soup"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDRsTDRXNj640uRkW8nWy5erQ6lJgzqMW3ODIAqTQL56SUbFItSgEUqHBoPvvuGh89x_UdyMOsXsLGxESw2qShKr0Da4Dzqu5KacERz5DP_89JhEdrrRgYq5NH0g-Vu5tEK3A_y8_UBJ8zmkd4_uXNYtFOv7zJ4BMsmt298qpYT35hA76sYERMvQjIhXzR5FtzvfksGs951zlY16lsgqX852DGjlvUNg_I4jQezPxB5vxmS1V6jq9T_XVrIBvG4Uwurcv_uYFz0xc4")',
          }}
        ></div>
      </div>
    </div>
  );
}

export default ImageGallery;
