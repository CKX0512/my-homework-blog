import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import './CreatePost.css'

function CreatePost() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [authorId, setAuthorId] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEdit)

  useEffect(() => {
    if (isEdit) {
      fetchPost()
    } else {
      // 创建新文章时，尝试获取或创建默认用户
      getOrCreateDefaultUser()
    }
  }, [id])

  const getOrCreateDefaultUser = async () => {
    try {
      // 尝试获取第一个用户，如果没有则创建一个默认用户
      const { data: users, error: fetchError } = await supabase
        .from('users')
        .select('id')
        .limit(1)

      if (fetchError) throw fetchError

      if (users && users.length > 0) {
        setAuthorId(users[0].id)
      } else {
        // 创建默认用户
        const { data: newUser, error: createError } = await supabase
          .from('users')
          .insert([{ username: '博主' }])
          .select()
          .single()

        if (createError) throw createError
        setAuthorId(newUser.id)
      }
    } catch (err) {
      console.error('Error getting/creating user:', err)
    }
  }

  const fetchPost = async () => {
    try {
      setFetching(true)
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      setTitle(data.title || '')
      setContent(data.content || '')
      setAuthorId(data.author_id || '')
    } catch (err) {
      alert('加载文章失败: ' + err.message)
      console.error('Error fetching post:', err)
      navigate('/')
    } finally {
      setFetching(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) {
      alert('请输入文章标题')
      return
    }

    try {
      setLoading(true)
      
      if (isEdit) {
        const { error } = await supabase
          .from('posts')
          .update({
            title: title.trim(),
            content: content.trim()
          })
          .eq('id', id)

        if (error) throw error
        navigate(`/post/${id}`)
      } else {
        if (!authorId) {
          await getOrCreateDefaultUser()
          // 等待一下让authorId设置
          await new Promise(resolve => setTimeout(resolve, 100))
        }

        const { data, error } = await supabase
          .from('posts')
          .insert([
            {
              title: title.trim(),
              content: content.trim(),
              author_id: authorId
            }
          ])
          .select()
          .single()

        if (error) throw error
        navigate(`/post/${data.id}`)
      }
    } catch (err) {
      alert('保存失败: ' + err.message)
      console.error('Error saving post:', err)
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>加载中...</p>
      </div>
    )
  }

  return (
    <div className="create-post">
      <div className="create-post-header">
        <h1>{isEdit ? '编辑文章' : '写新文章'}</h1>
        <p>{isEdit ? '修改你的文章内容' : '分享你的想法和知识'}</p>
      </div>

      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label htmlFor="title">文章标题 *</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="输入文章标题..."
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">文章内容</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="开始写作..."
            rows="20"
            className="form-textarea"
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-secondary"
          >
            取消
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? '保存中...' : isEdit ? '更新文章' : '发布文章'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreatePost

