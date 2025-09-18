import React from 'react'

function RecentPostBoxUI({ posts }) {
  let recentPost = posts.length > 10 ? posts.slice(-5) : posts.slice(-1)

  return (
    <div className="col-lg-4 col-md-5 col-12">
      <div
        className="border-start border-2 ps-3 position-sticky"
        style={{ top: '120px', lineHeight: '9px' }}
      >
        <h5 className="text-center mb-4">Recent Posts</h5>
        <div className="d-flex flex-column gap-1">
          {recentPost.map((post) => (
            <p className="bg-warning p-2 m-0" style={{ cursor: 'pointer' }}>
              {post.postData?.title}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecentPostBoxUI
