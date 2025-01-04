"use client";

export default function Footer() {
  return (
    <footer className="flex flex-col sm:flex-row gap-8 justify-between p-10 bg-base-100 mt-auto">
      {/* Brand */}
      <aside>
        <p className="text-2xl flex items-center gap-2">
          <img alt="LLMetrics Logo" src="/LLMetrics_logo.png" className="w-8 mr-2" />
          LLMetrics
        </p>
        <small className="text-sm">Copyright © 2024 - All rights reserved</small>
      </aside>

      {/* Socials */}
      <nav className="flex justify-center sm:justify-end gap-6 flex-grow">
        <a className="btn btn-ghost btn-circle" href="https://github.com/yenjordan" target="_blank" rel="noopener noreferrer">
          <i className="fa fa-github" style={{ fontSize: '30px' }}></i>
        </a>
        <a className="btn btn-ghost btn-circle" href="https://www.youtube.com/@jordanyen6656" target="_blank" rel="noopener noreferrer">
          <i className="fa fa-youtube" style={{ fontSize: '30px' }}></i>
        </a>
      </nav>
    </footer>
  );
}