function CreatePostButton({ isCreating, onClick }) {
  return (
    <button
      className="w-full border border-red-600 bg-red-700 px-4 py-2.5 text-sm font-bold uppercase text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-70"
      type="button"
      onClick={onClick}
      disabled={isCreating}
    >
      {isCreating ? 'Creating...' : 'Create Post'}
    </button>
  )
}

export default CreatePostButton
