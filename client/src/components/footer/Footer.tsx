/**
 * Footer component displays the site footer with copyright information and navigation links
 * 
 * @component
 * @returns {JSX.Element} A footer with copyright text and links to important pages
 */
const Footer = (): JSX.Element => {
  return (
    <footer className="bg-black p-4 mt-10">
      <div className="container mx-auto text-center text-white">
        <p>&copy; 2024 Eatme Store. All rights reserved.</p>
        <div className="mt-2">
          <a href="/privacy-policy.md" className="text-white hover:text-gray-200 mx-2">Privacy Policy</a>
          <a href="#terms" className="text-white hover:text-gray-200 mx-2">Terms of Service</a>
          <a href="#contact" className="text-white hover:text-gray-200 mx-2">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
