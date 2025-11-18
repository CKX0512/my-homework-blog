import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { format } from 'date-fns'
import zhCN from 'date-fns/locale/zh-CN'
import './Home.css'

function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    if (!supabase) {
      setError('Supabase 未正确配置，请检查 .env 文件')
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          users:author_id (
            username
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (err) {
      setError(err.message)
      console.error('Error fetching posts:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>加载中...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <p>❌ 加载失败: {error}</p>
      </div>
    )
  }

  return (
    <div className="home">
      <div className="home-header">
        <h1 className="home-title">最新文章</h1>
        <p className="home-subtitle">分享我的学习与思考</p>
      </div>

      {posts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📄</div>
          <h2>还没有文章</h2>
          <p>开始写你的第一篇文章吧！</p>
          <Link to="/create" className="btn btn-primary">
            写文章
          </Link>
        </div>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <article key={post.id} className="post-card">
              <Link to={`/post/${post.id}`}>
                <div className="post-card-header">
                  <h2 className="post-title">{post.title || '无标题'}</h2>
                  <div className="post-meta">
                    <span className="post-author">
                      {post.users?.username || '匿名'}
                    </span>
                    <span className="post-date">
                      {format(new Date(post.created_at), 'yyyy年MM月dd日', { locale: zhCN })}
                    </span>
                  </div>
                </div>
                <div className="post-card-body">
                  <p className="post-excerpt">
                    {post.content 
                      ? (post.content.length > 150 
                          ? post.content.substring(0, 150) + '...' 
                          : post.content)
                      : '暂无内容'}
                  </p>
                </div>
                <div className="post-card-footer">
                  <span className="read-more">阅读更多 →</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home

