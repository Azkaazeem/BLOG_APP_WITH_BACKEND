function PostCard({ post, onDelete }) {
  const postDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString()
    : 'New post'

  return (
    <article className="relative overflow-hidden border border-neutral-800 bg-[#181818] shadow-[0_12px_30px_rgba(0,0,0,0.22)]">
      <img
        className="aspect-[16/8.5] w-full border-b-2 border-red-700 object-cover"
        src={post.image}
        alt={post.title}
      />

      <div className="p-4">
        <p className="mb-2 text-[11px] font-bold uppercase text-red-400">{postDate}</p>
        <h2 className="mb-2 text-xl font-bold leading-tight text-white sm:text-2xl">
          {post.title}
        </h2>
        <p className="text-sm leading-6 text-neutral-300 sm:text-base">{post.content}</p>
      </div>
      <button
        onClick={() => onDelete(post._id)}
        className="absolute bottom-4 right-4 text-red-700 hover:text-red-500 transition-colors"
        title="Delete Post"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .471-.53Zm5.058 0a.5.5 0 0 1 .471.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
        </svg>
      </button>
    </article>
  )
}

export default PostCard
