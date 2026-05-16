import { useState } from 'react'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import CreatePostButton from '../components/CreatePostButton'
import EmptyState from '../components/EmptyState'
import PostCard from '../components/PostCard'

const API_URL = import.meta.env.VITE_API_URL || 'https://blog-app-with-backend-rho.vercel.app/api/v1/blog'

function Home() {
  const [posts, setPosts] = useState([])
  const [isCreating, setIsCreating] = useState(false)

  const openCreatePostModal = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Create Post',
      html: `
        <div class="mt-2 grid gap-3 text-left">
          <label class="grid gap-2 text-sm font-semibold text-red-500">
            <span>Image</span>
            <input id="post-image" class="w-full border border-red-900 bg-black px-3 py-2.5 text-white outline-none focus:border-red-500" type="file" accept="image/*" />
          </label>
          <label class="grid gap-2 text-sm font-semibold text-red-500">
            <span>Title</span>
            <input id="post-title" class="w-full border border-red-900 bg-black px-3 py-2.5 text-white outline-none focus:border-red-500" type="text" placeholder="Post title" />
          </label>
          <label class="grid gap-2 text-sm font-semibold text-red-500">
            <span>Description</span>
            <textarea id="post-content" class="min-h-28 w-full resize-y border border-red-900 bg-black px-3 py-2.5 text-white outline-none focus:border-red-500" placeholder="Write your post..."></textarea>
          </label>
        </div>
      `,
      confirmButtonText: 'Publish',
      cancelButtonText: 'Cancel',
      showCancelButton: true,
      buttonsStyling: false,
      customClass: {
        popup: 'rounded-md border border-red-700 bg-black text-white',
        title: 'text-red-500',
        confirmButton: 'mx-2 bg-red-700 px-5 py-2.5 font-bold text-white hover:bg-red-600',
        cancelButton: 'mx-2 bg-black border border-red-700 px-5 py-2.5 font-bold text-red-500 hover:bg-red-900',
        validationMessage: 'bg-black text-red-500 border border-red-700',
      },
      focusConfirm: false,
      preConfirm: () => {
        const image = document.getElementById('post-image').files[0]
        const title = document.getElementById('post-title').value.trim()
        const content = document.getElementById('post-content').value.trim()

        if (!image || !title || !content) {
          Swal.showValidationMessage('Image, title aur description sab required hain')
          return false
        }

        if (title.length < 4) {
          Swal.showValidationMessage('Title minimum 4 characters ka hona chahiye')
          return false
        }

        return { image, title, content }
      },
    })

    if (!formValues) return

    createPost(formValues)
  }

  const createPost = async ({ image, title, content }) => {
    try {
      setIsCreating(true)

      const formData = new FormData()
      formData.append('image', image)
      formData.append('title', title)
      formData.append('content', content)

      const response = await fetch(`${API_URL}/create`, {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!response.ok || !result.status) {
        throw new Error(result.message || 'Post create nahi ho saki')
      }

      setPosts((currentPosts) => [result.data, ...currentPosts])

      Swal.fire({
        icon: 'success',
        title: 'Post Published',
        text: 'Aapki post successfully create ho gayi.',
        timer: 1800,
        showConfirmButton: false,
        customClass: {
          popup: 'rounded-md border border-red-700 bg-black text-white',
          title: 'text-red-500',
        },
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong',
        text: error.message,
        confirmButtonText: 'Okay',
        buttonsStyling: false,
        customClass: {
          popup: 'rounded-md border border-red-700 bg-black text-white',
          title: 'text-red-500',
          confirmButton: 'bg-red-700 px-5 py-2.5 font-bold text-white hover:bg-red-600',
        },
      })
    } finally {
      setIsCreating(false)
    }
  }

  const deletePost = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to delete this post?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      buttonsStyling: false,
      customClass: {
        popup: 'rounded-md border border-red-700 bg-black text-white',
        title: 'text-red-500',
        confirmButton: 'mx-2 bg-red-700 px-5 py-2.5 font-bold text-white hover:bg-red-600',
        cancelButton: 'mx-2 bg-black border border-red-700 px-5 py-2.5 font-bold text-red-500 hover:bg-red-900',
      },
    })

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${API_URL}/delete/${id}`, {
          method: 'DELETE',
        })
        const data = await response.json()

        if (!response.ok || !data.status) {
          throw new Error(data.message || 'Post delete nahi ho saki')
        }

        setPosts((currentPosts) => currentPosts.filter((post) => post._id !== id))

        Swal.fire({
          title: 'Deleted!',
          text: 'Aapki post successfully delete ho gayi.',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'rounded-md border border-red-700 bg-black text-white',
            title: 'text-red-500',
          },
        })
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Failed to delete',
          text: error.message,
          confirmButtonText: 'Okay',
          buttonsStyling: false,
          customClass: {
            popup: 'rounded-md border border-red-700 bg-black text-white',
            title: 'text-red-500',
            confirmButton: 'bg-red-700 px-5 py-2.5 font-bold text-white hover:bg-red-600',
          },
        })
      }
    }
  }

  return (
    <main className="min-h-screen bg-black px-px sm:px-[10vw] lg:px-[20vw]">
      <section className="mx-auto min-h-screen max-w-[760px] border-x border-red-950 bg-[#0f0f0f]">
        <header className="sticky top-0 z-10 border-b border-neutral-800 bg-[#0f0f0f]/95 px-3 py-3 backdrop-blur sm:px-4">
          <div className="mx-auto max-w-[620px]">
            <CreatePostButton isCreating={isCreating} onClick={openCreatePostModal} />
          </div>
        </header>

        <div className="mx-auto grid max-w-[620px] gap-4 px-3 py-4 sm:px-4">
          {posts.length === 0 ? (
            <EmptyState />
          ) : (
            posts.map((post) => <PostCard key={post._id || post.image} post={post} onDelete={deletePost} />)
          )}
        </div>
      </section>
    </main>
  )
}

export default Home
