export default function Sidebar({ handleTabsButtons, isTabSelected }) {
  return (
    <div
      class="card "
      style={{
        position: 'sticky',
        top: '90px',
        height: '60vh',
        flexBasis: '15%',
      }}
    >
      <div class="card-body d-flex flex-column gap-2">
        <h5 class="card-title text-center">Profile Function</h5>
        <div
          className={
            isTabSelected === 'myAccount' ? 'border border-1' : 'bg-primary'
          }
        >
          <p
            className={
              isTabSelected === 'myAccount'
                ? 'text-primary text-center'
                : 'text-white text-center'
            }
            style={{
              position: 'relative',
              top: '6px',
              cursor: 'pointer',
            }}
            onClick={() => {
              handleTabsButtons('myAccount')
            }}
          >
            account
          </p>
        </div>
        <div
          className={
            isTabSelected === 'myPosts' ? 'border border-1' : 'bg-primary'
          }
        >
          <p
            className={
              isTabSelected === 'myPosts'
                ? 'text-primary text-center'
                : 'text-white text-center'
            }
            style={{
              position: 'relative',
              top: '6px',

              cursor: 'pointer',
            }}
            onClick={() => {
              handleTabsButtons('myPosts')
            }}
          >
            posts
          </p>
        </div>
      </div>
    </div>
  )
}
