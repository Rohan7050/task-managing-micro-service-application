function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className='py-3 bg-gray-900'>
      <div className="text-white">© {year} YourCompany. All rights reserved.</div>
    </footer>
  )
}

export default Footer