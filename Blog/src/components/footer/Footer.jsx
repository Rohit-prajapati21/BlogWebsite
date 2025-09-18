// import React from 'react'

// function Footer() {
//   return (
//     <div className="container">
//       <footer className="py-3 my-4">
//         <ul className="nav justify-content-center border-bottom pb-3 mb-3">
//           <li className="nav-item">
//             <a href="#" className="nav-link px-2 text-body-secondary">
//               Home
//             </a>
//           </li>
//           <li className="nav-item">
//             <a href="#" className="nav-link px-2 text-body-secondary">
//               Features
//             </a>
//           </li>
//           <li className="nav-item">
//             <a href="#" className="nav-link px-2 text-body-secondary">
//               Pricing
//             </a>
//           </li>
//           <li className="nav-item">
//             <a href="#" className="nav-link px-2 text-body-secondary">
//               FAQs
//             </a>
//           </li>
//           <li className="nav-item">
//             <a href="#" className="nav-link px-2 text-body-secondary">
//               About
//             </a>
//           </li>
//         </ul>
//         <p className="text-center text-body-secondary">© 2025 Company, Inc</p>
//       </footer>
//     </div>
//   )
// }

// export default Footer

import React from 'react'

function Footer() {
  return (
    <footer className="bg-dark text-light py-4" style={{ marginTop: '9%' }}>
      <div className="container">
        <div className="row">
          {/* About */}
          <div className="col-md-4 mb-3">
            <h5>About Us</h5>
            <p>
              Welcome to MyBlog – a place to share stories, insights, and
              knowledge. Join our community and explore more.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-light text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a href="/footer" className="text-light text-decoration-none">
                  About
                </a>
              </li>
              <li>
                <a href="/posts" className="text-light text-decoration-none">
                  Posts
                </a>
              </li>
              <li>
                <a
                  href="/create-post"
                  className="text-light text-decoration-none"
                >
                  create post
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="col-md-4 mb-3">
            <h5>Contact</h5>
            <p>Email: example@myblog.com</p>
            <div>
              <a href="https://twitter.com" className="text-light me-3">
                Twitter
              </a>
              <a href="https://instagram.com" className="text-light me-3">
                Instagram
              </a>
              <a href="https://linkedin.com" className="text-light">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <hr className="border-light" />
        <p className="text-center mb-0">
          © {new Date().getFullYear()} MyBlog. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
