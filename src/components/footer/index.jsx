const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
      <div className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Crypto Tracker. Eğitim amaçlı
              proje
            </p>
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            <span> Thanks: Furkan Evin - API: CoinGecko</span>
            <span className="mx-2 text-2xl leading-none relative top-0.5">
              •
            </span>
            <span>React + TailwindCSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
